const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const { protect } = require("../middleware/auth");
const Users = require("../models/Users");
const TrackingSessions = require("../models/TrackingSessions.js");
const ErrorResponse = require("../utils/errorResponse");
const UsersRecords = require("../models/UsersRecords");
const getPreviousSunday = require("../utils/helpers");

//CRUD

//read by id
router.route("/:id").get(protect, async (req, res, next) => {
    if (req.userInfo._id == req.params.id) {
        try {
            let user = await Users.findById(req.params.id);
            res.status(200).json({
                success: true,
                data: {
                    userInfo: user._doc,
                },
            });
        } catch (error) {
            next(error);
        }
    } else {
        return next(new ErrorResponse("Non autorizzato", 403));
    }
}); //da proteggere

//update
router.route("/:id").put(protect, async (req, res, next) => {
    if (req.userInfo._id == req.params.id) {
        try {
            if (req.query.password) {
                //se stiamo modificando la password vediamo se fa match quella vecchia
                try {
                    const user = await Users.findById(req.userInfo._id).select(
                        "+password"
                    );

                    //compariamo la password passata a quella salvata nel database
                    const isMatch = await user.matchPasswords(
                        req.body.oldPassword
                    );

                    if (!isMatch) {
                        return next(
                            new ErrorResponse(
                                "Vecchia password non corretta",
                                404
                            )
                        );
                    }

                    req.body = { password: req.body.passwordNew };
                } catch (error) {
                    return next(error);
                }
            }
            //ritorna l'user updato
            let updatedUser = await Users.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true, runValidators: true, useFindAndModify: false }
            );
            res.status(200).json({
                success: true,
                data: {
                    userInfo: updatedUser._doc,
                },
            });
        } catch (error) {
            next(error);
        }
    } else {
        return next(
            new ErrorResponse("Puoi modificare solo il tuo account", 403)
        );
    }
}); //da proteggere

//delete
router.route("/:id").delete(protect, async (req, res, next) => {
    if (req.userInfo._id == req.params.id) {
        try {
            await Users.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                data: "Utente eliminato con successo",
            });
        } catch (error) {
            next(error);
        }
    } else {
        return next(
            new ErrorResponse("Puoi modificare solo il tuo account", 403)
        );
    }
}); //da proteggere

//statistics about calories and distance in this week + records
router.route("/stats/:id").get(protect, async (req, res, next) => {
    if (req.userInfo._id == req.params.id) {
        try {
            const lastSunday = getPreviousSunday();

            const trackingInThisWeek = await TrackingSessions.aggregate([
                {
                    $match: {
                        user: mongoose.Types.ObjectId(req.params.id),
                        startDate: { $gte: lastSunday },
                    },
                }, //get all the tracking session in this week since sunday of this user

                {
                    $project: {
                        // Change document with date to a value just for the day
                        day: {
                            $dayOfWeek: "$startDate",
                        },
                        calories: 1,
                        distance: 1,
                    },
                },
                {
                    $group: {
                        //count for each day the distance and the calories
                        _id: "$day",
                        countCalories: { $sum: "$calories" },
                        countDistance: { $sum: "$distance" },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            const userRecords = await UsersRecords.findOne({
                user: mongoose.Types.ObjectId(req.params.id),
            });

            const data = {
                trackingStatistics: trackingInThisWeek,
                userRecords: userRecords?._doc,
            };

            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    } else {
        return next(
            new ErrorResponse("Puoi modificare solo il tuo account", 403)
        );
    }
}); //da proteggere

module.exports = router;
