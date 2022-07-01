const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email richiesta"],
            unique: true,
            match: [
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Email non valida",
            ],
        },
        password: {
            type: String,
            required: [true, "Password richiesta"],
            minlength: [8, "Password troppo breve"],
            select: false, //non vogliamo che la password sia mandata quando richiediamo un user
        },
        fullName: {
            type: String,
            required: [true, "Nome completo richiesto"],
        },
        weight: Number,
        height: Number,
        gender: String,

        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true }
);

//middleware eseguito prima di salvare il documento nel database.
UserSchema.pre("save", async function (next) {
    //se la password non viene modificata salta, altrimenti la salva con hash e salt
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    //aggiungiamo il sale alla password
    this.password = await bcrypt.hash(this.password, salt);
    return next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
    //in questo caso si modifica l'azione non il documento
    if (!this.getUpdate().$set.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    //aggiungiamo il sale alla password
    this.getUpdate().$set.password = await bcrypt.hash(
        this.getUpdate().$set.password,
        salt
    );
    return next();
});

//metodo per questo modello per verificare se le password combaciano
UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//il token contiene i dati dell'utente
UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomInt(0, 9999).toString().padStart(4, "0")    //genera una cifra casuale nel formato xxxx

    //setta il campo resetPasswordToken di questo utente
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    //10 minuti
    this.resetPasswordExpire =
        Date.now() + process.env.RESET_TOKEN_EXPIRE * (60 * 1000);

    //ritorniamo la versione non hashata
    return resetToken;
};

module.exports = mongoose.model("Users", UserSchema);
