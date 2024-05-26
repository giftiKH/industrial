const DistributionRatio = require("../models/DistributionRatio");
const DistributionSchedule = require("../models/DistributionSchedule");
const Invoice = require("../models/Invoice");
const Textbook = require("../models/Textbook");

// Create a new distribution ratio
exports.createDistributionRatio = async (req, res) => {
  const { preparedBy, title, ratio } = req.body;

  try {
    // Create a new distribution ratio entry
    const newDistributionRatio = new DistributionRatio({
      preparedBy,
      title,
      ratio,
    });

    await newDistributionRatio.save();

    // Generate invoices for each organization in the ratio
    for (const item of ratio) {
      const textbooks = await Promise.all(
        item.textbook.map(async (book) => {
          const foundTextbook = await Textbook.findById(book.id);
          return {
            id: foundTextbook._id,
            forPrivate: book.forPrivate,
            forPublic: book.forPublic,
            total: book.total,
            unitPrice: foundTextbook.price,
            subtotal: foundTextbook.price * book.total,
          };
        })
      );

      const total = textbooks.reduce((sum, book) => sum + book.subtotal, 0);

      const newInvoice = new Invoice({
        organization: item.organization,
        textbooks: textbooks,
        distributionRatio: newDistributionRatio._id,
        subtotal: total,
        total: total,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: item.payment,
        acceptance: {
          confirmation: "not confirmed",
        },
      });

      await newInvoice.save();
    }

    // Generate distribution schedules for each organization in the ratio
    const scheduleEntries = ratio.map((item) => ({
      organization: item.organization,
      distributionCenter: "", // Placeholder for distribution center
    }));

    const newDistributionSchedule = new DistributionSchedule({
      preparedBy,
      title,
      schedule: scheduleEntries,
    });

    await newDistributionSchedule.save();

    res.status(201).json({
      distributionRatio: newDistributionRatio,
      distributionSchedule: newDistributionSchedule,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllDistributionRatios = async (req, res) => {
  try {
    const distributionRatios = await DistributionRatio.find()
      .populate("preparedBy", "name")
      .populate("ratio.organization", "name")
      .populate("ratio.textbook.id", "title grade subject");
    res.status(200).json(distributionRatios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDistributionRatioById = async (req, res) => {
  try {
    const distributionRatio = await DistributionRatio.findById(req.params.id)
      .populate("preparedBy", "name")
      .populate("ratio.organization", "name")
      .populate("ratio.textbook.id", "title grade subject");
    if (!distributionRatio) {
      return res.status(404).json({ message: "Distribution ratio not found" });
    }
    res.status(200).json(distributionRatio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDistributionRatio = async (req, res) => {
  const { ratio } = req.body;

  try {
    const distributionRatio = await DistributionRatio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!distributionRatio) {
      return res.status(404).json({ message: "Distribution ratio not found" });
    }

    for (const org of ratio) {
      const { organization, textbook, payment } = org;
      let invoice = await Invoice.findOne({
        distributionRatio: req.params.id,
        organization,
      });

      if (invoice) {
        let subtotal = 0;
        const invoiceTextbooks = [];

        for (const tb of textbook) {
          const { id, forPrivate, forPublic, total } = tb;
          const textbookDetails = await Textbook.findById(id);
          const unitPrice = textbookDetails.price;

          const invoiceTextbook = {
            id,
            forPrivate,
            forPublic,
            total,
            unitPrice,
            subtotal: total * unitPrice,
          };

          invoiceTextbooks.push(invoiceTextbook);
          subtotal += total * unitPrice;
        }

        invoice.textbooks = invoiceTextbooks;
        invoice.subtotal = subtotal;
        invoice.total = subtotal;
        invoice.status = payment;

        await invoice.save();
      } else {
        const invoiceTextbooks = [];
        let subtotal = 0;

        for (const tb of textbook) {
          const { id, forPrivate, forPublic, total } = tb;
          const textbookDetails = await Textbook.findById(id);
          const unitPrice = textbookDetails.price;

          const invoiceTextbook = {
            id,
            forPrivate,
            forPublic,
            total,
            unitPrice,
            subtotal: total * unitPrice,
          };

          invoiceTextbooks.push(invoiceTextbook);
          subtotal += total * unitPrice;
        }

        const newInvoice = new Invoice({
          organization,
          textbooks: invoiceTextbooks,
          distributionRatio: distributionRatio._id,
          subtotal,
          total: subtotal,
          dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          status: payment,
          acceptance: {},
        });

        await newInvoice.save();
      }
    }

    res.status(200).json(distributionRatio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDistributionRatio = async (req, res) => {
  try {
    const distributionRatio = await DistributionRatio.findByIdAndDelete(
      req.params.id
    );
    if (!distributionRatio) {
      return res.status(404).json({ message: "Distribution ratio not found" });
    }

    await Invoice.deleteMany({ distributionRatio: req.params.id });

    res.status(200).json({
      message: "Distribution ratio and related invoices deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
