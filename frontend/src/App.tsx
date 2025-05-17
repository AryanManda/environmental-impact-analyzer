import { useState } from 'react';
import { ProductAnalyzer } from './components/ProductAnalyzer';
import { AnalysisResult } from './components/AnalysisResult';
import { Header } from './components/Header';
import { ImpactAnalysis } from './types';
import './App.css';

function App() {
  const [analysisResult, setAnalysisResult] = useState<ImpactAnalysis | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductAnalyzer onAnalysisComplete={setAnalysisResult} />
        {analysisResult && <AnalysisResult result={analysisResult} />}
      </main>
    </div>
  );
}

export default App; 