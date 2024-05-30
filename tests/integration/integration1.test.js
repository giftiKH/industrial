require("dotenv").config();
const mongoose = require("mongoose");
const DistributionRatio = require("../../models/DistributionRatio");
const Invoice = require("../../models/Invoice");
const Textbook = require("../../models/Textbook");
const {
  createDistributionRatio,
} = require("../../controllers/distributionRatioController");
const { connect, disconnect } = require("../../config/db");

// Increase the Jest timeout for this test suite
jest.setTimeout(30000); // 30 seconds

describe("Integration Test: Distribution Ratio and Invoice", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await DistributionRatio.deleteMany();
    await Invoice.deleteMany();
    await Textbook.deleteMany();
  });

  it("should create a new distribution ratio and generate invoices for each organization", async () => {
    // Create sample textbook data
    const textbookData = [
      {
        title: "Textbook 1",
        price: 50,
        category: "student textbook",
        language: "english",
        subject: "Physics",
        level: "highschool",
        grade: 10,
      },
      {
        title: "Textbook 2",
        price: 60,
        category: "teacher guide",
        language: "english",
        subject: "Algebra",
        level: "highschool",
        grade: 11,
      },
    ];

    const textbooks = await Textbook.insertMany(textbookData);

    // Create a sample distribution ratio
    const distributionRatioData = {
      preparedBy: new mongoose.Types.ObjectId(),
      title: "Sample Distribution Ratio",
      ratio: [
        {
          organization: new mongoose.Types.ObjectId(),
          textbook: [
            { id: textbooks[0]._id, forPrivate: 10, forPublic: 20, total: 30 },
            { id: textbooks[1]._id, forPrivate: 5, forPublic: 15, total: 20 },
          ],
          payment: "not-required",
        },
      ],
    };

    const req = { body: distributionRatioData };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Call the createDistributionRatio function
    await createDistributionRatio(req, res);

    // Retrieve the distribution ratio from the database
    const savedDistributionRatio = await DistributionRatio.findById(
      res.json.mock.calls[0][0].distributionRatio._id
    );
    expect(savedDistributionRatio).toBeDefined();
    expect(savedDistributionRatio.title).toBe(distributionRatioData.title);
    expect(savedDistributionRatio.ratio.length).toBe(
      distributionRatioData.ratio.length
    );

    // Retrieve the generated invoices from the database
    const invoices = await Invoice.find().populate("textbooks.id");

    // Assert that invoices were generated
    expect(invoices.length).toBe(distributionRatioData.ratio.length);

    // Validate invoice details
    invoices.forEach((invoice, index) => {
      expect(invoice.organization.toString()).toBe(
        distributionRatioData.ratio[index].organization.toString()
      );
      expect(invoice.distributionRatio.toString()).toBe(
        savedDistributionRatio._id.toString()
      );
      expect(invoice.subtotal).toBe(50 * 30 + 60 * 20);
      expect(invoice.total).toBe(50 * 30 + 60 * 20);
      expect(invoice.dueDate).toBeDefined();
      expect(invoice.status).toBe("not-required");

      invoice.textbooks.forEach((textbook, tbIndex) => {
        expect(textbook.id.title).toBe(textbookData[tbIndex].title);
        expect(textbook.unitPrice).toBe(textbookData[tbIndex].price);
        expect(textbook.subtotal).toBe(textbook.total * textbook.unitPrice);
      });
    });
  });

});
