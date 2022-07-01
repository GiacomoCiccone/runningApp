const mongoose = require("mongoose");

const UsersRecordsSchema = new mongoose.Schema(
    {
        maxSpeed: {
            type: Number,
            default: 0,
        },
        _maxDistance: { // underscore to avoid name conflicts with mongoose
            type: Number,
            default: 0,
        },
        maxCalories: {
            type: Number,
            default: 0,
        },
        maxTime: {
            type: Number,
            default: 0,
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

//update only if greaters value
UsersRecordsSchema.pre("findOneAndUpdate", async function (next) {

    const docToUpdate = await this.model.findOne(this.getQuery());

    const newMaxSpeed =  this.getUpdate().$set.maxSpeed
    const newMaxDistance =  this.getUpdate().$set._maxDistance
    const newMaxCalories =  this.getUpdate().$set.maxCalories
    const newMaxTime =  this.getUpdate().$set.maxTime

    if(newMaxSpeed < docToUpdate.maxSpeed) {
        this.getUpdate().$set.maxSpeed = docToUpdate.maxSpeed
    }
    if(newMaxDistance < docToUpdate._maxDistance) {
        this.getUpdate().$set._maxDistance = docToUpdate._maxDistance
    }
    if(newMaxCalories < docToUpdate.maxCalories) {
        this.getUpdate().$set.maxCalories = docToUpdate.maxCalories
    }
    if(newMaxTime < docToUpdate.maxTime) {
        this.getUpdate().$set.maxTime = docToUpdate.maxTime
    }
    return next();
});

module.exports = mongoose.model("UsersRecords", UsersRecordsSchema);