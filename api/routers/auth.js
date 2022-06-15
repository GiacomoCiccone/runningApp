const express = require("express");
const Users = require("../models/Users");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//permette di creare percorsi di route modulari
var router = express.Router();

//register
router.route("/register").post(async (req, res, next) => {

  try {
    const user = new Users(req.body);

    //generiamo un token da mandare al client per l'autenticazione
    const authToken = user.getSignedToken();

    //salviamo gli aggionrnamenti nel database
    await user.save();

    //non mandiamo la password. password: _ per evitare conflitti di nomi
    const { password: _, ...info } = user._doc;

    //Mandiamo token + userInfo
    res.status(201).json({
      success: true,
      data: {
        authToken: authToken,
        userInfo: { ...info }
      }
    });
  } catch (error) {
    next(error);
  }
});


//login
router.route("/login").post(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Fornire email e password", 400)
    );
  }
  try {
    //cerca l'user e ritorna anche la password eludendo select: false nello schema
    const user = await Users.findOne({ email: email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Credenziali non corrette", 404));
    }

    //compariamo la password passata a quella salvata nel database
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Credenziali non corrette", 404));
    }

    const authToken = user.getSignedToken();

    //non mandiamo la password. password: not per evitare conflitti di nomi
    const { password: not, ...info } = user._doc;
    res
      .status(200)
      .json({
        success: true,
        data: {
          authToken: authToken,
          userInfo: { ...info }
        }
      });
  } catch (error) {
    next(error);
  }
});


//forgotPassword
router.route("/forgotPassword").post(async (req, res, next) => {
  const { email } = req.body;

  try {
    //cerchiamo utente con questa password
    const user = await Users.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Credenziali non corrette", 404));
    }

    //generiamo un token
    const resetToken = user.getResetPasswordToken();

    //salviamo gli aggionrnamenti nel database
    await user.save();

    const message = `
            <h1>Ciao ${user.fullName}</h1>
            <p>Il codice per ripristinare il tuo account è: ${resetToken}</p>
        `;

    try {
      //mandiamo la mail
      await sendEmail({
        to: user.email,
        subject: "Codice di ripristino password",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email inviata" });
    } catch (error) {
      //se c'è un errore annulliamo il token e l'utente dovra' richiederne un altro
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      //salviamo al database
      await user.save();

      return next(new ErrorResponse("L'email non è stata inviata", 500));
    }
  } catch (error) {
    next(error);
  }
});

//resetPassword
router.route("/resetPassword/:resetToken").put(async (req, res, next) => {
  //prendiamo la versione non hashata del token dal parametro e la hasiamo come abbiamo fatto per salvarla nel database
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await Users.findOne({
      resetPasswordToken: resetPasswordToken,
      //query che dice che l'expire è dopo il tempo attuale
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      //il token è scaduto
      return next(new ErrorResponse("Richiesta non valida", 400));
    }

    //la password verra' hashata con sale nel pre "save"
    user.password = req.body.password;
    //si resettano
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    //aggiorna la password e i campi
    await user.save();

    res
      .status(200)
      .json({ success: true, data: "Password ripristinata con successo" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
