import { Request, Response } from 'express';
import { analyzeProductImpact } from '../services/ml.service';

export const analyzeProduct = async (req: Request, res: Response) => {
  try {
    const { productName, description } = req.body;

    if (!productName) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    const analysis = await analyzeProductImpact(productName, description);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing product:', error);
    res.status(500).json({ error: 'Failed to analyze product' });
  }
}; 