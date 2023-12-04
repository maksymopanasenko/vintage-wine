const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SharesSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: [String],
            required: true
        },
        image: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: new Date()
        },
        tags: {
            type: [String]
        }
    }
)

module.exports = Shares = mongoose.model('shares', SharesSchema);