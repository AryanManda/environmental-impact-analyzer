export interface ImpactAnalysis {
  score: number;
  breakdown: {
    carbonFootprint: number;
    waterUsage: number;
    energyConsumption: number;
    recyclability: number;
  };
  suggestions: string[];
}

export interface ProductAnalyzerProps {
  onAnalysisComplete: (result: ImpactAnalysis) => void;
}

export interface AnalysisResultProps {
  result: ImpactAnalysis;
}

export interface ProductAnalysisRequest {
  productName: string;
  description?: string;
} 