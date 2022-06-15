const express = require("express");
//permette di creare percorsi di route modulari
var router = express.Router();
const { protect } = require("../middleware/auth");
const Users = require("../models/Users");
const ErrorResponse = require("../utils/errorResponse");

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
                        req.body.passwordOld
                    );

                    if (!isMatch) {
                        return next(
                            new ErrorResponse("Credenziali non corrette", 404)
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

//others

//statistiche
module.exports = router;
