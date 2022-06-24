const mongoose = require("mongoose");

const TrackingSessionSchema = new mongoose.Schema(
    {
        startDate: {
            type: Date,
            required: [true, "Data di inizio richiesta"],
        },
        endDate: {
            type: Date,
            required: [true, "Data di fine richiesta"],
        },
        maxSpeed: {
            type: Number,
            required: [true, "Velocità massima richiesta"],
        },
        averageSpeed: {
            type: Number,
            required: [true, "Velocità media richiesta"],
        },
        calories: {
            type: Number,
            required: [true, "Calorie richieste"],
        },
        weather: {
            icon: String,
            temp: Number,
        },
        distance: {
            type: Number,
            required: [true, "Distanza richiesta"],
        },
        time: {
            type: Number,
            required: [true, "Durata richiesta"],
        },
        averagePace: {
            type: Number,
            required: [true, "Ritmo medio richiesto"],
        },
        history: {
            type: [[]],
            required: [true, "Cronologia corsa richiesta"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: [true, "Utente richiesto"],
            select: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("TrackingSessions", TrackingSessionSchema);
