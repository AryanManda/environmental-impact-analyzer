import axios from 'axios';

interface ImpactAnalysis {
  score: number;
  breakdown: {
    carbonFootprint: number;
    waterUsage: number;
    energyConsumption: number;
    recyclability: number;
  };
  suggestions: string[];
}

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';

export const analyzeProductImpact = async (
  productName: string,
  description?: string
): Promise<ImpactAnalysis> => {
  try {
    const response = await axios.post<ImpactAnalysis>(`${ML_SERVICE_URL}/analyze`, {
      productName,
      description,
    });
    return response.data;
  } catch (error) {
    console.error('Error calling ML service:', error);
    // Fallback to mock data if ML service is unavailable
    return {
      score: 65,
      breakdown: {
        carbonFootprint: 30,
        waterUsage: 20,
        energyConsumption: 25,
        recyclability: 25,
      },
      suggestions: [
        'Consider using recycled materials',
        'Look for products with energy-efficient manufacturing',
        'Choose products with minimal packaging',
      ],
    };
  }
}; 