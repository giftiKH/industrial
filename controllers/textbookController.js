const Textbook = require('../models/Textbook');

// Get all textbooks
exports.getAllTextbooks = async (req, res) => {
    try {
        const textbooks = await Textbook.find();
        res.status(200).json(textbooks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new textbook
exports.createTextbook = async (req, res) => {
    const textbook = new Textbook({
        grade: req.body.grade,
        title: req.body.title,
        subject: req.body.subject,
        language: req.body.language,
        category: req.body.category,
        totalQuantity: req.body.totalQuantity
    });

    try {
        const newTextbook = await textbook.save();
        res.status(201).json(newTextbook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a textbook by ID
exports.getTextbookById = async (req, res) => {
    try {
        const textbook = await Textbook.findById(req.params.id);
        if (textbook == null) {
            return res.status(404).json({ message: 'Cannot find textbook' });
        }
        res.status(200).json(textbook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a textbook
exports.updateTextbook = async (req, res) => {
    try {
        const textbook = await Textbook.findById(req.params.id);
        if (textbook == null) {
            return res.status(404).json({ message: 'Cannot find textbook' });
        }

        if (req.body.grade != null) {
            textbook.grade = req.body.grade;
        }
        if (req.body.title != null) {
            textbook.title = req.body.title;
        }
        if (req.body.subject != null) {
            textbook.subject = req.body.subject;
        }
        if (req.body.language != null) {
            textbook.language = req.body.language;
        }
        if (req.body.category != null) {
            textbook.category = req.body.category;
        }
        if (req.body.totalQuantity != null) {
            textbook.totalQuantity = req.body.totalQuantity;
        }

        const updatedTextbook = await textbook.save();
        res.status(200).json(updatedTextbook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a textbook
exports.deleteTextbook = async (req, res) => {
    try {
        const textbook = await Textbook.findById(req.params.id);
        if (textbook == null) {
            return res.status(404).json({ message: 'Cannot find textbook' });
        }

        await Textbook.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Deleted textbook' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
