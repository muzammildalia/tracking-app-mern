import  ActivityModel  from "../models/activityModel.js";
import  userModel  from "../models/userModel.js";

//CREATE activities
export const createActivityController = async (req, res) => {
  try {
    const { title, description, activityType, duration, date } = req.body;
    const userId = req.user._id;
    if (!title) {
      return res.status(401).send({
        message: "Title is required",
      });
    }
    if (!description) {
      return res.status(401).send({
        message: "Discription is required",
      });
    }
    if (!activityType) {
      return res.status(401).send({
        message: "Activity Type is required",
      });
    }
    if (!duration) {
      return res.status(401).send({
        message: "Duration is required",
      });
    }
    if (!date) {
      return res.status(401).send({
        message: "date is required",
      });
    }
    const existingActivity = await ActivityModel.findOne({ title });
    if (existingActivity) {
      return res.status(200).send({
        success: false,
        message: "Activity already exists",
      });
    }
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const activity = await new ActivityModel({
      person: userId,
      title,
      description,
      activity_type: activityType,
      duration,
      date,
    }).save();

    res.status(201).send({
      success: true,
      message: "Activity Successfully Saved",
      activity: {
        _id: activity._id,
        title: activity.title,
        description: activity.description,
        activity_type: activity.activity_type,
        duration: activity.duration,
        date: activity.date,
        person: {
          _id: existingUser._id,
          name: existingUser.name,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating activity",
      error,
    });
  }
};

//READ get activities

export const getUserActivitiesController = async (req, res) => {
  const { userId } = req.params; // Assuming the user ID is passed as a route parameter

  try {
    const activities = await ActivityModel.find({ person: userId }).exec();
    res.status(200).send(activities);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch user activities." });
  }
};

// export const updateActivity = async (req, res) => {
//     const { activityId } = req.params;
//     const { title, description, activityType, duration, date } = req.body;

//     try {
//         const existingActivity = await ActivityModel.findById(activityId);
//         if (!existingActivity) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Activity not found',
//             });
//         }

//         existingActivity.title = title;
//         existingActivity.description = description;
//         existingActivity.activity_type = activityType;
//         existingActivity.duration = duration;
//         existingActivity.date = date;

//         const updatedActivity = await existingActivity.save();

//         res.status(200).json({
//             success: true,
//             message: 'Activity successfully updated',
//             activity: updatedActivity,
//         });
//     } catch (error) {
//         console.error('Error updating activity:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error updating activity',
//             error,
//         });
//     }
// };

export const updateActivityController = async (req, res) => {
  const { activityId } = req.params;
  const { title, description, activity_type, duration, date } = req.body;
  try {
    const existingActivity = await ActivityModel.findById(activityId);

    if (!existingActivity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    const updatedActivity = await ActivityModel.findByIdAndUpdate(
      activityId,
      {
        title: title || existingActivity.title,
        description: description || existingActivity.description,
        activity_type: activity_type || existingActivity.activity_type,
        duration: duration || existingActivity.duration,
        date: date || existingActivity.date,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Activity successfully updated",
      activity: updatedActivity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating activity",
      error,
    });
  }
};

export const deleteActivityController = async (req, res) => {
  const { activityId } = req.params;

  try {
    const deletedActivity = await ActivityModel.findByIdAndDelete(activityId);
    if (!deletedActivity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Activity successfully deleted",
      activity: deletedActivity,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in deleting activity",
      error,
    });
  }
};
