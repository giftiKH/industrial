const ReceivedTextbook = require("../models/RecievedTextbook");
const Textbook = require("../models/Textbook");


exports.createReceivedTextbook = async (req, res) => {
  const { textbooks, receiver, publisher } = req.body;

  try {
    // Check if all textbooks exist
    const textbooksExist = await Promise.all(
      textbooks.map(async (item) => {
        const textbook = await Textbook.findById(item.textbook);
        return textbook !== null;
      })
    );

    // If any textbook does not exist, return error
    if (textbooksExist.some((exist) => !exist)) {
      return res
        .status(400)
        .json({ message: "One or more textbooks do not exist" });
    }

    let totalPrice = 0;
    let totalQuantity = 0;

    // Calculate total price and quantity for received textbooks
    await Promise.all(
      textbooks.map(async (item) => {
        const textbook = await Textbook.findById(item.textbook);
        const textbookPrice = textbook.price * item.quantity;
        totalPrice += textbookPrice;
        totalQuantity += item.quantity;
        // Update availableQuantity for each textbook
        textbook.availableQuantity += item.quantity;
        await textbook.save();
      })
    );

    // Update price on textbooks
    await Promise.all(
      textbooks.map(async (item) => {
        const textbook = await Textbook.findById(item.textbook);
        textbook.price = item.price; // Update price
        await textbook.save();
      })
    );

    // Create a new received textbook entry
    const newReceivedTextbook = new ReceivedTextbook({
      textbooks,
      receiver,
      publisher,
      price: totalPrice,
      quantity: totalQuantity,
    });

    // Save the new received textbook entry
    await newReceivedTextbook.save();

    // Respond with success message and the created received textbook entry
    res.status(201).json(newReceivedTextbook);
  } catch (err) {
    // Handle errors
    res.status(400).json({ message: err.message });
  }
};

// Get all received textbooks
exports.getAllReceivedTextbooks = async (req, res) => {
  try {
    const receivedTextbooks = await ReceivedTextbook.find()
      .populate({
        path: "textbooks.textbook",
        select: "title grade subject language category level availableQuantity price", // Include price field
      })
      .populate({
        path: "receiver",
        select: "full_name",
      });
    res.status(200).json(receivedTextbooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a received textbook entry by ID
exports.getReceivedTextbookById = async (req, res) => {
  try {
    const receivedTextbook = await ReceivedTextbook.findById(req.params.id)
      .populate({
        path: "textbooks.textbook",
        select:
          "title grade subject language category level availableQuantity price", // Include price field
      })
      .populate({
        path: "receiver",
        select: "full_name organization",
      });
    if (!receivedTextbook) {
      return res
        .status(404)
        .json({ message: "Received textbook entry not found" });
    }
    res.status(200).json(receivedTextbook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Update a received textbook entry
exports.updateReceivedTextbook = async (req, res) => {
  const { textbooks, receiver, publisher } = req.body;

  try {
    // Find the existing received textbook entry
    const receivedTextbook = await ReceivedTextbook.findById(req.params.id);
    if (!receivedTextbook) {
      return res
        .status(404)
        .json({ message: "Received textbook entry not found" });
    }

    // Revert the changes made by the old entry
    await Promise.all(
      receivedTextbook.textbooks.map(async (item) => {
        const textbook = await Textbook.findById(item.textbook);
        textbook.availableQuantity -= item.quantity;
        await textbook.save();
      })
    );

    // Update the received textbook entry with new data
    receivedTextbook.textbooks = textbooks;
    receivedTextbook.receiver = receiver;
    receivedTextbook.publisher = publisher;

    await receivedTextbook.save();

    // Apply the changes for the new entry
    await Promise.all(
      textbooks.map(async (item) => {
        const textbook = await Textbook.findById(item.textbook);
        textbook.availableQuantity += item.quantity;
        textbook.price = item.price; // Update price
        await textbook.save();
      })
    );

    res.status(200).json(receivedTextbook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




// Delete a received textbook entry
exports.deleteReceivedTextbook = async (req, res) => {
  try {
    // Find the received textbook entry to be deleted
    const receivedTextbook = await ReceivedTextbook.findById(req.params.id);
    if (!receivedTextbook) {
      return res
        .status(404)
        .json({ message: "Received textbook entry not found" });
    }

    // Revert the changes made by the entry
    await Promise.all(
      receivedTextbook.textbooks.map(async (item) => {
        const textbook = await Textbook.findById(item.textbook);
        textbook.availableQuantity -= item.quantity;
        await textbook.save();
      })
    );

    // Delete the received textbook entry
    await ReceivedTextbook.deleteOne({ _id: req.params.id });

    res
      .status(200)
      .json({ message: "Received textbook entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
