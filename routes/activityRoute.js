import express from 'express';
import { requireSignIn } from '../middleware/authMiddleware.js';
import { createActivityController, getActivityController } from '../controllers/activityController.js';



const router = express.Router()


//route for 
router.post('/create-activity', requireSignIn, createActivityController)


router.get('/get-activity', requireSignIn, getActivityController)

export default router;