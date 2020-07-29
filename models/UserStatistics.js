const mongoose = require('mongoose');

let userStatisticsSchema = mongoose.Schema({
    date: {
        required: true,
        type: Date,
        default: Date.now
    },
    startTime: {
        required: true,
        type: Date
    },
    workPhase: {  // in minutes
        required: true,
        type: Number
    },
    restPhase: {  // in minutes
        required: true,
        type: Number
    },
    longRestPhase: {  // in minutes
        required: true,
        type: Number
    },
    finishTime: {
        required: true,
        type: Date
    },
    totalTime: {  // in minutes
        required: true,
        type: Number
    },
    userId: {
        required: true,
        type: Number
    }
});

let UserStatistics = module.exports = mongoose.model('UserStatistics', userStatisticsSchema);
