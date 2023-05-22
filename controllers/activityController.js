import ActivityModel from "../models/ActivityModel.js";
import userModel from "../models/userModel.js";
export const createActivityController = async (req, res) => {
    try {
        const { personId, title, description, activityType, duration, date } = req.body;
        if (!title) {
            return res.status(401).send({
                message: "Title is required"
            })
        }
        if (!description) {
            return res.status(401).send({
                message: "Discription is required"
            })
        }
        if (!activityType) {
            return res.status(401).send({
                message: "Activity Type is required"
            })
        }
        if (!duration) {
            return res.status(401).send({
                message: "Duration is required"
            })
        }
        if (!date) {
            return res.status(401).send({
                message: "date is required"
            })
        }
        const existingActivity = await ActivityModel.findOne({ title });
        if (existingActivity) {
            return res.status(200).send({
                success: false,
                message: 'Activity already exists'
            });
        }
        const activity = await new ActivityModel({
            person: personId,
            title,
            description,
            activity_type: activityType,
            duration,
            date
        }).save();

        res.status(201).send({
            success: true,
            message: 'Activity Successfully Saved',
            activity
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating activity',
            error
        });
    }
};

export const getActivityController = async (req, res) => {
    try {
        const activity = await ActivityModel.find({})
        res.status(201).send({
            success: true,
            message: "Loading Activities Successfull",
            activity
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "cannot Get Activities",
            error
        })
    }
};

export const getUserActivities = async (req, res) => {
    const { userId } = req.params; // Assuming the user ID is passed as a route parameter

    try {
        const activities = await Activity.find({ person: userId }).exec();
        res.status(200).send(activities);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch user activities.' });
    }
};

export const getactivitController = async (req, res) => {
    try {
        const activity = await ActivityModel
            .find({ person: req.user._id })
            .populate("person", "_id")
        res.status(201).send({
            success: true,
            message: "user activities get sucessfully",
            activity
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Activities",
            error,
        });
    }
};