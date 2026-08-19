import React from 'react';
import { DocPage } from '../../components/ui/DocPage';

const April17Meeting: React.FC = () => {
  return (
    <DocPage
      eyebrow="Meeting recap · Apr 17, 2025"
      title="Post-Microsoft meeting & word vectorization"
      lede="Popeyes, word embeddings, and a live Word2Vec demo. Slides, code, and the notebook are all below."
    >
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Food</h2>
        <p>Popeyes 🍗</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Lecture</h2>
        <p>Topic: Word Embeddings</p>
        <p>Presenters: Spence and Michal</p>
        <a href="/documents/word_embeddings_lecture.pdf" download className="text-blue-600 underline">
          Download Lecture PDF
        </a>

        <div className="mt-4">
          <h3 className="text-xl font-medium mb-1">Code Demonstration:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{`// Example using Word2Vec in Python
from gensim.models import Word2Vec

# Sample training corpus
data = [["machine", "learning", "is", "fun"], ["word", "embeddings", "capture", "semantics"]]

# Train model
model = Word2Vec(sentences=data, vector_size=100, window=5, min_count=1, workers=4)

# Get vector for a word
vector = model.wv['machine']
print(vector)`}</code>
          </pre>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-medium mb-1">Download Notebook (.ipynb):</h3>
          <a href="pages/events/word2vec.ipynb" download className="text-blue-600 underline">
            Download Jupyter Notebook
          </a>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">AI News Update</h2>
        <p>Presenters: Josh and Brian</p>
        <p>Duration: 5 minutes</p>
        <p>Topics: Content in AI news section</p>

        <div className="mt-4">
          <h3 className="text-xl font-medium mb-1">Attached PDF:</h3>
          <a
            href="/documents/ai_news.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View AI News Slides
          </a>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">QR Code Time</h2>
        <p>Responsible: Sam</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Learning Session</h2>
        <p>Topic: Piggie Bank Project</p>
        <p>Presenter: Sam</p>
        <p className="mt-2">Note: Building on one prompt and continuously developing new features on one project.</p>
        <p>Structure: Four Parts | Platform: Google Colab</p>
      </section>
    </DocPage>
  );
};

export default April17Meeting;
