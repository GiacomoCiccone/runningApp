const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const { protect } = require("../middleware/auth");
const TrackingSessions = require("../models/TrackingSessions.js")
const UsersRecords = require("../models/UsersRecords.js")
const ErrorResponse = require("../utils/errorResponse");

//CRUD

//get all by user id
router.route("/:id").get(protect, async (req, res, next) => {
    if (req.userInfo._id == req.params.id) {
        const page = parseInt(req.query.page);
        try {
            
            const trackingSessions = await TrackingSessions.find({user: mongoose.Types.ObjectId(req.params.id)})
            .populate('history')
            .sort({startDate: -1})
            .skip(page * 20)
            .limit(20);

            if(trackingSessions.length === 0)

            return res.status(404).json({
                data: {
                    finished: true
                }
            })
            
            res.status(200).json({
                success: true,
                data: {
                    history: trackingSessions,
                },
            });
        } catch (error) {
            next(error);
        }
    } else {
        return next(new ErrorResponse("Non autorizzato", 403));
    }
}); //da proteggere

//create a new tracking session
router.route("/").post(async (req, res, next) => {
  try {
    const trackingSession = new TrackingSessions(req.body);
    await trackingSession.save();
    const recordsOfUser = await UsersRecords.findOne({user: mongoose.Types.ObjectId(req.body.user)})
    const recordBody = {
        maxSpeed: req.body.maxSpeed,
        _maxDistance: req.body.distance,
        maxCalories: req.body.calories,
        maxTime: req.body.time,
        user: req.body.user
    }


    if(!recordsOfUser) {
        const newRecord = new UsersRecords(recordBody)

        await newRecord.save();
    } else {
        await UsersRecords.findOneAndUpdate({user: mongoose.Types.ObjectId(req.body.user)}, { $set: recordBody },
        { new: true, runValidators: true, useFindAndModify: false })
    }

    res.status(201).json({
      success: true,
      data: "Inserimento avvenuto con successo"
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router