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
            default: 0
        },
        averageSpeed: {
            type: Number,
            required: [true, "Velocità media richiesta"],
            default: 0
        },
        calories: {
            type: Number,
            required: [true, "Calorie richieste"],
            default: 0
        },
        distance: {
            type: Number,
            required: [true, "Distanza richiesta"],
            default: 0
        },
        time: {
            type: Number,
            required: [true, "Durata richiesta"],
            default: 0
        },
        averagePace: {
            type: Number,
            required: [true, "Ritmo medio richiesto"],
            default: 0
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
