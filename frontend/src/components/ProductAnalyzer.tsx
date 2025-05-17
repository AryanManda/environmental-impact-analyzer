import { useState } from 'react';
import axios from 'axios';
import { ProductAnalyzerProps, ImpactAnalysis } from '../types';

export const ProductAnalyzer = ({ onAnalysisComplete }: ProductAnalyzerProps) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post<ImpactAnalysis>('http://localhost:5000/api/products/analyze', {
        productName,
        description,
      });
      onAnalysisComplete(response.data);
    } catch (err) {
      setError('Failed to analyze product. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Analyze Product Impact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="Enter product name..."
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="Enter product description..."
            rows={3}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Impact'}
        </button>
        {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}; 