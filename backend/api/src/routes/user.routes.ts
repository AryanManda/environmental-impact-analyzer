import { Router } from 'express'; const router = Router(); router.get('/profile', (req, res) => { res.status(501).json({ message: 'Not implemented yet' }); }); export const userRouter = router;
