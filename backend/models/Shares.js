const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SharesSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        pathParts: {
            type: String,
            required: true
        },
        conditions: {
            type: String,
            required: true
        },
        productCategories: {
            type: String,
            required: true
        },
        imageURL: {
            type: String,
        },
    }
)

module.exports = Shares = mongoose.model('shares', SharesSchema);
