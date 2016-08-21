import Trips from './routes/trips';
import Links from './routes/links';
import Express from 'express';
const router = new Express.Router();

router.use('/trips', Trips);
router.use('/links', Links);
export default router;
//export default [Trips,Links];