const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textbookSchema = new Schema({
    grade: { type: Number, required: true, min: 1, max: 12 },
    level: { type: String, required: true, enum: ['elementary', 'highschool'] },
    title: { type: String, required: true },
    subject: { type: String, required: true },
    language: { type: String, required: true, enum: ['Amharic', 'English', 'Afaan Oromo'] },
    category: { type: String, required: true, enum: ['Teacher guide', 'Student textbook'] },
    totalQuantity: { type: Number, required: true }
});

textbookSchema.pre('validate', function(next) {
    if (this.grade >= 1 && this.grade <= 8) {
        this.level = 'elementary';
    } else if (this.grade >= 9 && this.grade <= 12) {
        this.level = 'highschool';
    }
    next();
});

const Textbook = mongoose.model('Textbook', textbookSchema);

module.exports = Textbook;
