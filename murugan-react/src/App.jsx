import React, { useState } from 'react';
import api from './axios';
import './App.css';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReview('');
    try {
      const response = await api.post('/review-code', { repo_url: repoUrl });
      setReview(response.data.review || JSON.stringify(response.data));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">DevOps AI Agent</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter GitHub repo URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Reviewing...' : 'Review Code'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {review && (
        <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2 text-gray-800">AI Review</h2>
          <pre className="whitespace-pre-wrap break-words text-gray-700">{review}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
