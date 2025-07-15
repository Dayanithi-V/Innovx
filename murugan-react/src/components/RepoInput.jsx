import React from 'react';

const RepoInput = ({ value, onChange, onSubmit, loading, placeholder }) => (
  <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Repository URL</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder={placeholder || 'Enter GitHub repo URL'}
      required
    />
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      disabled={loading}
    >
      {loading ? 'Reviewing...' : 'Review Code'}
    </button>
  </form>
);

export default RepoInput; 