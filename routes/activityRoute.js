import express from 'express';
import { requireSignIn } from '../middleware/authMiddleware.js';
import { createActivityController, deleteActivityController, getUserActivitiesController, updateActivityController } from '../controllers/activityController.js';



const router = express.Router()


//route for 
router.post('/create-activity', requireSignIn, createActivityController);

router.get("/user-activities/:userId", getUserActivitiesController);

router.put('/update-activities/:activityId', requireSignIn, updateActivityController);

router.delete('/remove-activities/:activityId', deleteActivityController)

export default router;