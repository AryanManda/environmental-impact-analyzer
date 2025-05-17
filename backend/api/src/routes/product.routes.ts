import { Router } from 'express';
import { analyzeProduct } from '../controllers/product.controller';

const router = Router();

router.post('/analyze', analyzeProduct);
router.get('/history/:userId', (req, res) => {
  // TODO: Implement history endpoint
  res.status(501).json({ message: 'Not implemented yet' });
});

export const productRouter = router 