import { PieChart } from './PieChart';

interface AnalysisResultProps {
  result: {
    score: number;
    breakdown: {
      carbonFootprint: number;
      waterUsage: number;
      energyConsumption: number;
      recyclability: number;
    };
    suggestions: string[];
  };
}

export const AnalysisResult = ({ result }: AnalysisResultProps) => {
  return (
    <div className="mt-8 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Overall Score</h3>
        <div className="text-4xl font-bold text-green-600">{result.score}/100</div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Impact Breakdown</h3>
        <PieChart data={result.breakdown} />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Suggestion</h3>
        <p>{result.suggestions[0]}</p>
      </div>
    </div>
  );
}; 