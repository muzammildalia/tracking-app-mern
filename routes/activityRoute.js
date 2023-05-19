import express from 'express';
import { requireSignIn } from '../middleware/authMiddleware.js';
import { createActivityController } from '../controllers/activityController.js';



const router = express.Router()


//route for 
router.post('/create-activity', requireSignIn, createActivityController)


export default router;