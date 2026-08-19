import React, { useState } from 'react';
import { DocPage } from '../../components/ui/DocPage';

const PythonIntro: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <DocPage
      eyebrow="Meeting recap · Mar 6, 2025"
      title="Python and AI intro"
      lede="Newcomers wrote their first Python; everyone else split into project teams. The full beginner tutorial from the session is included below."
    >
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Lab Demonstration</h2>
        <p className="mb-4">During the meeting, a lab demonstration was shown by the AI club members.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Newcomers&apos; Learning Experience</h2>
        <p className="mb-4">The newcomers learned basic Python programming.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Experienced Members&apos; Discussion</h2>
        <p className="mb-4">
          The more experienced members broke out into teams to discuss long-term projects that involve AI in various
          fields.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Project List</h2>
        <ul className="list-disc list-inside">
          <li>Project 1: AI in Healthcare</li>
          <li>Project 2: AI in Finance</li>
          <li>Project 3: AI in Education</li>
          <li>Project 4: AI in Transportation</li>
        </ul>
      </section>

      {!showTutorial && (
        <button
          type="button"
          onClick={() => {
            setShowTutorial(true);
          }}
          className="group mt-10 flex w-full cursor-pointer flex-col items-center gap-4 rounded-3xl border border-dashed border-white/12 bg-white/[0.02] p-10 transition-colors duration-400 hover:border-crimson-500/50"
        >
          <img
            src="/eventimages/pythonlogo.png"
            alt=""
            className="w-24 transition-transform duration-500 group-hover:scale-110"
          />
          <span className="font-mono text-xs tracking-[0.2em] text-crimson-300 uppercase">
            Open the Python tutorial →
          </span>
        </button>
      )}

      {showTutorial && (
        <Tutorial
          onClose={() => {
            setShowTutorial(false);
          }}
        />
      )}
    </DocPage>
  );
};

const Tutorial: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="relative mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-9">
      <button
        type="button"
        className="float-right rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-ink-300 transition-colors hover:border-crimson-400/50 hover:text-white"
        onClick={onClose}
      >
        Close tutorial
      </button>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Basic Python Concepts:</h2>
        <h2 className="text-2xl font-semibold mb-2">Prerequisites:</h2>
        <ul className="list-disc list-inside mb-6">
          <li>
            Python installed on your computer:{' '}
            <a href="https://www.python.org/downloads/" className="text-blue-500 underline">
              https://www.python.org/downloads
            </a>
          </li>
          <li>
            An IDE such as{' '}
            <a href="https://code.visualstudio.com/download" className="text-blue-500 underline">
              VSCode
            </a>{' '}
            or{' '}
            <a href="https://replit.com/" className="text-blue-500 underline">
              Repl.it
            </a>
          </li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Printing to the Console</h3>
        <p className="mb-4">
          You can print text to the console using the <code>print</code> function:
        </p>
        <pre className="bg-gray-100 p-4 rounded mb-6">
          <code>print&#40;&quot;Hello, AI Club!&quot;&#41;</code>
        </pre>
        <p className="mb-4">Output:</p>
        <pre className="bg-gray-100 p-4 rounded mb-6">
          <code>Hello, AI Club!</code>
        </pre>

        <h3 className="text-xl font-semibold mb-2">Defining Functions</h3>
        <p className="mb-4">
          Functions allow you to encapsulate code for reuse. Here&apos;s an example of a basic function:
        </p>
        <pre className="bg-gray-100 p-4 rounded mb-6">
          <code>{`def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("AI Club")`}</code>
        </pre>
        <p className="mb-4">Output:</p>
        <pre className="bg-gray-100 p-4 rounded mb-6">
          <code>Hello, AI Club!</code>
        </pre>

        <h3 className="text-xl font-semibold mb-2">Variables</h3>
        <p className="mb-4">Variables store data values. Here&apos;s how you can define and use variables:</p>
        <pre className="bg-gray-100 p-4 rounded mb-6">
          <code>{`name = "AI Club"\nprint(name)`}</code>
        </pre>
        <p className="mb-4">Output:</p>
        <pre className="bg-gray-100 p-4 rounded mb-6">
          <code>AI Club</code>
        </pre>

        <h3 className="text-xl font-semibold mb-2">Loops</h3>
        <p className="mb-4">
          Loops allow you to execute a block of code multiple times. Here&apos;s an example of a for loop:
        </p>
        <pre className="bg-gray-100 p-4 rounded mb-6">
          <code>{`for i in range(5):\n    print(i)`}</code>
        </pre>
        <p className="mb-4">Output:</p>
        <pre className="bg-gray-100 p-4 rounded mb-6">
          <code>{`0\n1\n2\n3\n4`}</code>
        </pre>

        <h3 className="text-xl font-semibold mb-2">Conditionals</h3>
        <p className="mb-4">
          Conditionals allow you to execute code based on certain conditions. Here&apos;s an example:
        </p>
        <pre className="bg-gray-100 p-4 rounded mb-6 overflow-x-scroll">
          <code>{`x = 10\nif x > 5:\n    print("x is greater than 5")\nelse:\n    print("x is 5 or less")`}</code>
        </pre>
        <p className="mb-4">Output:</p>
        <pre className="bg-gray-100 p-4 rounded mb-6">
          <code>x is greater than 5</code>
        </pre>

        <h3 className="text-xl font-semibold mb-2">Lists</h3>
        <p className="mb-4">
          Lists store multiple items in a single variable. Here&apos;s how you can define and use lists:
        </p>
        <pre className="bg-gray-100 p-4 rounded mb-6 overflow-x-scroll">
          <code>{`fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)`}</code>
        </pre>
        <p className="mb-4">Output:</p>
        <pre className="bg-gray-100 p-4 rounded mb-6">
          <code>{`apple\nbanana\ncherry`}</code>
        </pre>
        <p className="mb-4">Now it&apos;s your turn, try to build something yourself.</p>
      </section>
    </div>
  );
};

export default PythonIntro;
