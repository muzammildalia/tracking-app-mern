import ActivityModel from "../models/ActivityModel.js";

export const createActivityController = async (req, res) => {
    try {
        const { title, description, activity_type, duration, date } = req.body;
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
        if (!activity_type) {
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
            title,
            description,
            activity_type,
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