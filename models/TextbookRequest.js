const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textbookRequestSchema = new Schema({
    textbooks: [
        {
            textbookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Textbook', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    evaluation: {
        status: { type: String, enum: ['accepted', 'rejected', 'not evaluated'], default: 'not evaluated' },
        evaluatedBy: { type: String, default: null },
        comment: { type: String, default: null },
        evaluationDate: { type: Date, default: null }
    },
    requestDate: { type: Date, default: Date.now },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const TextbookRequest = mongoose.model('TextbookRequest', textbookRequestSchema);

module.exports = TextbookRequest;
