const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //"Bearer Token"
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Non autorizzato", 401));
  }

  try {
    //prendiamo l'id che avevamo salvato nel token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //cerchiamo l'user con tale id
    const user = await User.findById(decoded.id);

    //se non esiste errore
    if (!user) {
      return next(new ErrorResponse("Utente non trovato", 404));
    }

    //settiamo req.userInfo a questo user per i prossimi middleware
    req.userInfo = user;

    return next();
  } catch (error) {
    return next(new ErrorResponse("Non autorizzato", 401));
  }
};
