const Textbook = require("../models/Textbook");

// Create a new textbook
exports.createTextbook = async (req, res) => {
  const { grade, title, subject, language, category } = req.body;

  // Create a new textbook with default price and availableQuantity
  const textbook = new Textbook({
    grade,
    title,
    subject,
    language: language.toLowerCase(),
    category: category.toLowerCase(),
    price: 0, // Default value
    availableQuantity: 0, // Default value
  });

  try {
    const newTextbook = await textbook.save();
    res.status(201).json(newTextbook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all textbooks
exports.getAllTextbooks = async (req, res) => {
  try {
    // Use collation for case-insensitive searches
    const textbooks = await Textbook.find().collation({
      locale: "en",
      strength: 2,
    });
    res.json({ success: true, textbooks });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


// Get a textbook by ID
exports.getTextbookById = async (req, res) => {
  try {
    const textbook = await Textbook.findById(req.params.id).exec();
    if (!textbook) {
      return res.status(404).json({ message: "Cannot find textbook" });
    }
    res.status(200).json(textbook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a textbook
exports.updateTextbook = async (req, res) => {
  try {
    const { grade, title, subject, language, category } = req.body;

    const textbook = await Textbook.findById(req.params.id).exec();
    if (!textbook) {
      return res.status(404).json({ message: "Cannot find textbook" });
    }

    if (grade != null) {
      textbook.grade = grade;
    }
    if (title != null) {
      textbook.title = title;
    }
    if (subject != null) {
      textbook.subject = subject;
    }
    if (language != null) {
      textbook.language = language.toLowerCase();
    }
    if (category != null) {
      textbook.category = category.toLowerCase();
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
    const textbook = await Textbook.findById(req.params.id).exec();
    if (!textbook) {
      return res.status(404).json({ message: "Cannot find textbook" });
    }

    await textbook.deleteOne(); // Use deleteOne() instead of remove()
    res.status(200).json({ message: "Deleted textbook" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
