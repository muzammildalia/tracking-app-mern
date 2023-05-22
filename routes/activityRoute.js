import express from 'express';
import { requireSignIn } from '../middleware/authMiddleware.js';
import { createActivityController, getactivitController, getUserActivities } from '../controllers/activityController.js';



const router = express.Router()


//route for 
router.post('/create-activity', requireSignIn, createActivityController)

// router.get("/user/:userId/activities", async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         // Query the database to fetch activities associated with the user ID
//         const activities = await Activity.find({ userId });

//         res.json({ success: true, activities });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });

router.get('/get-activity', requireSignIn, getactivitController)

export default router;