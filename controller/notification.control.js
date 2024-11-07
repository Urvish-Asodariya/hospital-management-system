const Notification = require("../models/notification.model");

exports.sendNotification = async (userId, message, type) => {
    try {
        const newNotification = new Notification({ userId, message, type });
        await newNotification.save();
        const success = {
            status: true,
            message: "Notification sent successfully",
            data: message
        };
        return success;
    } catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        return error;
    }
};

exports.getUserNotifications = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notifications = await Notification.find(userId);
        const success = {
            status: 200,
            message: "Notifications retrieved successfully",
            data: notifications
        };
        return res.json(success);
    } catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        return error;
    }
};

exports.markNotificationRead = async (req, res) => {
    try {
        const notificationId = req.params.notificationId;
        const updatedNotification = await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
        if (!updatedNotification){
            const error={
                status:404,
                message:"Notification not found"
            };
            return res.json(error);
        }else{
            const success = {
                status: 200,
                message: "Notification marked as read",
                data: updatedNotification
            };
            return res.json(success);
        }
    } catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        return error;
    }
};

exports.deleteNotification = async(req,res)=>{
    try{
        const notificationId = req.params.notificationId;
        const deletedNotification = await Notification.findByIdAndRemove(notificationId);
        if(!deletedNotification){
            const error = {
                status:404,
                message:"Notification not found"
            };
            return res.json(error);
        }else{
            const success = {
                status: 200,
                message: "Notification deleted"
            };
            return res.json(success);
        }
    }catch(err){
        const error = {
            status: err.status,
            message: err.message
        };
        return error;
    }
};