import { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function TrainingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [trainingData, setTrainingData] = useState<{ number: number; pixels: number[] }[]>([]);
  const [predictedNumber, setPredictedNumber] = useState<number | null>(null);
  const pixelArray = useRef<number[]>(new Array(1024).fill(0));
  const modelRef = useRef<tf.Sequential | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    setCurrentNumber(generateRandomNumber());
    const storedData = localStorage.getItem('trainingData');
    if (storedData) {
      setTrainingData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trainingData', JSON.stringify(trainingData));
  }, [trainingData]);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => e.preventDefault();
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    setDrawing(true);
    draw(event);
  };

  const endDrawing = () => {
    setDrawing(false);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in event ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
    const y = 'touches' in event ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
    // Light ink on the dark canvas so strokes stay visible.
    ctx.fillStyle = '#ffe0e2';
    drawCustomShape(ctx, Math.floor((x / rect.width) * canvas.width), Math.floor((y / rect.height) * canvas.height));
  };

  const drawCustomShape = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const fillPixel = (px: number, py: number) => {
      if (px >= 0 && px < 32 && py >= 0 && py < 32) {
        const index = py * 32 + px;
        pixelArray.current[index] = 1;
        ctx.fillRect(px, py, 1, 1);
      }
    };

    for (let dx = -2; dx <= 2; dx++) {
      for (let dy = -2; dy <= 2; dy++) {
        if (
          !(dx === -2 && dy === -2) &&
          !(dx === 2 && dy === -2) &&
          !(dx === -2 && dy === 2) &&
          !(dx === 2 && dy === 2)
        ) {
          fillPixel(x + dx, y + dy);
        }
      }
    }
  };

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pixelArray.current.fill(0);
  };

  const submitCanvas = () => {
    if (currentNumber === null) return;
    setTrainingData((prevData) => [...prevData, { number: currentNumber, pixels: [...pixelArray.current] }]);
    console.log('Submitted data:', {
      number: currentNumber,
      pixels: [...pixelArray.current],
    });
    clearCanvas();
    setCurrentNumber(generateRandomNumber());
  };

  const trainModel = async () => {
    setIsTraining(true);
    if (trainingData.length === 0) {
      console.log('No training data available.');
      return;
    }

    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1024], units: 256, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.5 }));
    model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.5 }));
    model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'sparseCategoricalCrossentropy',
      metrics: ['accuracy'],
    });

    modelRef.current = model;
    const xs = tf.tensor2d(
      trainingData.map((d) => d.pixels),
      [trainingData.length, 1024],
      'float32',
    );
    const ys = tf.tensor1d(
      trainingData.map((d) => d.number),
      'float32',
    );

    await model.fit(xs, ys, { epochs: 10 });
    console.log('Training complete');
    console.log('Model summary:', model.summary());
    setIsTraining(false);
  };

  const testModel = async () => {
    if (!modelRef.current) {
      console.log('No trained model available.');
      return;
    }
    const testPixels = new Array(1024).fill(0).map(() => Math.random());
    const prediction = modelRef.current.predict(tf.tensor2d([testPixels], [1, 1024], 'float32')) as tf.Tensor;
    const predictedNumber = (await prediction.argMax(1).data())[0];
    setPredictedNumber(predictedNumber);
    const testAccuracy = (await prediction.data())[predictedNumber];
    setAccuracy(testAccuracy);
    setTimeout(() => setPredictedNumber(null), 1700);
    setTimeout(() => setAccuracy(null), 1500);
    console.log('Predicted number:', predictedNumber);
  };

  return (
    <div className="px-5 pt-20 pb-20 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-wide text-ink-400 uppercase transition-colors hover:text-crimson-300"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          All projects
        </Link>

        <header className="mt-8 text-center">
          <span className="inline-flex items-center gap-3 eyebrow text-crimson-300/90">
            <span className="h-px w-8 bg-linear-to-r from-crimson-500 to-transparent" />
            Live demo
          </span>
          <h1 className="mt-5 text-section font-bold text-white">
            Handwritten <span className="text-gradient">digit recognizer</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-300">
            Draw digits to build a dataset, train a small neural network right in your browser, then test it. Nothing
            leaves your machine — TensorFlow.js does all the work locally.
          </p>
        </header>

        {/* Canvas panel */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 p-8 backdrop-blur-xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-52 w-96 -translate-x-1/2 rounded-full bg-crimson-600/20 blur-[90px]"
          />

          <div className="relative flex flex-col items-center">
            <p className="eyebrow text-ink-500">Draw this digit</p>
            <div className="mt-3 font-display text-6xl font-bold text-gradient tabular-nums">
              {currentNumber ?? '—'}
            </div>

            <div className="relative mt-8">
              <canvas
                ref={canvasRef}
                width="32"
                height="32"
                className="touch-none rounded-2xl border border-crimson-500/30 bg-ink-950 shadow-[0_0_60px_-20px_rgba(240,48,63,0.9)]"
                style={{
                  imageRendering: 'pixelated',
                  width: '256px',
                  height: '256px',
                  cursor: 'crosshair',
                }}
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={endDrawing}
                onTouchMove={draw}
              />

              <AnimatePresence>
                {predictedNumber !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="absolute inset-0 grid place-items-center rounded-2xl bg-ink-950/85 backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <div className="font-display text-7xl font-bold text-gradient">{predictedNumber}</div>
                      {accuracy !== null && (
                        <div className="mt-2 font-mono text-xs text-ink-300">
                          {(accuracy * 100).toFixed(1)}% confident
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={clearCanvas}
                className="cursor-pointer rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm text-ink-200 transition-colors hover:border-crimson-400/50 hover:text-white"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={submitCanvas}
                className="cursor-pointer rounded-full bg-crimson-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-crimson-500 hover:shadow-[0_8px_28px_-8px] hover:shadow-crimson-500/80"
              >
                Save sample
              </button>
              <button
                type="button"
                onClick={() => {
                  void trainModel();
                }}
                disabled={isTraining}
                className="cursor-pointer rounded-full border border-emerald-400/40 bg-emerald-500/15 px-5 py-2.5 text-sm text-emerald-200 transition-colors hover:bg-emerald-500/25 disabled:cursor-wait disabled:opacity-60"
              >
                {isTraining ? 'Training…' : 'Train model'}
              </button>
              <button
                type="button"
                onClick={() => {
                  void testModel();
                }}
                disabled={isTraining}
                className="cursor-pointer rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm text-ink-200 transition-colors hover:border-crimson-400/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Test model
              </button>
            </div>

            <div className="mt-8 flex items-center gap-2 font-mono text-xs text-ink-500">
              <span
                className={`h-2 w-2 rounded-full ${isTraining ? 'animate-pulse bg-emerald-400' : 'bg-crimson-600'}`}
              />
              Dataset size: {trainingData.length} sample{trainingData.length === 1 ? '' : 's'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
