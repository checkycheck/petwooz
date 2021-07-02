const notificationServices = require('../services/service.Notification');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require('../models/user.model');

module.exports = {
    sendToGeneral: asyncHandler(async(req, res, next) =>{
        notificationServices.sendToGeneral(req, res, next);
    }),

    sendToUser: asyncHandler(async(req, res, next) =>{
        var { message, link, broadcast_type } = req.body;
        if (message == null ) {
        return res.status(400).json({
            success: false,
            message: `${message == null ? "message" : "link"} is required field `,
        });
        }
        //post
        if (!req.body.broadcast_type) {
        return res.status(400).json({
            success: false,
            message: "broadcast_type is a required field",
        });
        } else {
        if (broadcast_type == "all") {
            notificationServices.sendToGeneral(message, "broadcast", link);
        }

        if (broadcast_type == "individual") {
            var user = await User.findById(req.body.user_id).exec();
            if (user) {
            notificationServices.sendToUser(user, message, "broadcast", link);
            } else {
            return res.status(500).json({
                success: false,
                message: "User not found",
            });
            }
        }
        }
        return res.status(200).json({
        success: true,
        message: "Broadcast sent successfully",
        });
    }),

    subscribeToTopic: asyncHandler(async(req, res, next) =>{
        var updated = await User.findByIdAndUpdate(req.user._id, {
            $set: {
              deviceToken: req.body.token.trim(),
              deviceRegistered: true,
            },
          }).exec();
          // console.log("This is th token " + req.body.token);
          notificationServices.subscribeToTopic(req.body.token, "general");
          return res.status(200).send({
            status: "success",
            message: "Registeration token set successfully",
          });
    })
}