const mongoose = require("mongoose");
const { connect, disconnect } = require("./config/db");
const Organization = require("./models/organization");
const organizationController = require("./controllers/organizationController");

describe("Organization controller", () => {
  let req, res;

  beforeAll(async () => {
    await connect(global.__MONGO_URI__);
  });

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(async () => {
    // Delete only the documents added during testing
    await Organization.deleteMany();
  });


  afterAll(async () => {
    await disconnect();
  });

  describe("addOrganization", () => {
    it("should add a new organization", async () => {
      req.body = {
        name: "Test Organization",
        email: "test@example.com",
        phone: "1234567890",
        fax: "1234567891",
        location: "Test Location",
        type: "AACEB",
      };

      await organizationController.addOrganization(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        organization: expect.any(Object),
      });
    });

    it("should return an error if adding fails", async () => {
      req.body = {}; // Invalid data

      await organizationController.addOrganization(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: expect.any(String),
      });
    });
  });

  describe("editOrganization", () => {
    it("should edit an organization", async () => {
      const organization = new Organization({
        name: "Old Organization",
        email: "old@example.com",
        phone: "1234567890",
        fax: "1234567891",
        location: "Old Location",
        type: "AACEB",
      });
      await organization.save();

      req.params.id = organization._id;
      req.body.name = "Updated Organization";

      await organizationController.editOrganization(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        organization: expect.objectContaining({
          name: "Updated Organization",
        }),
      });
    });

    it("should return an error if organization not found", async () => {
      req.params.id = new mongoose.Types.ObjectId(); // Non-existent ID
      req.body.name = "Updated Organization";

      await organizationController.editOrganization(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Organization not found",
      });
    });
  });

  describe("deleteOrganization", () => {
    it("should delete an organization", async () => {
      const organization = new Organization({
        name: "To Be Deleted",
        email: "delete@example.com",
        phone: "1234567890",
        fax: "1234567891",
        location: "Delete Location",
        type: "AACEB",
      });
      await organization.save();

      req.params.id = organization._id;

      await organizationController.deleteOrganization(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Organization deleted successfully",
      });
    });

    it("should return an error if organization not found", async () => {
      req.params.id = new mongoose.Types.ObjectId(); // Non-existent ID

      await organizationController.deleteOrganization(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Organization not found",
      });
    });
  });

  describe("getAllOrganizations", () => {
    it("should get all organizations", async () => {
      await new Organization({
        name: "Organization 1",
        email: "org1@example.com",
        phone: "1234567890",
        fax: "1234567891",
        location: "Location 1",
        type: "AACEB",
      }).save();

      await organizationController.getAllOrganizations(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        organizations: expect.any(Array),
      });
    });
  });

  describe("getOrganizationsByType", () => {
    it("should get organizations by type", async () => {
      await new Organization({
        name: "Organization Type A",
        email: "typea@example.com",
        phone: "1234567890",
        fax: "1234567891",
        location: "Location A",
        type: "AACEB",
      }).save();

      req.params.type = "AACEB";

      await organizationController.getOrganizationsByType(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        organizations: expect.any(Array),
      });
    });
  });

  describe("getOrganizationsByParent", () => {
    it("should get organizations by parent", async () => {
      const parentOrg = new Organization({
        name: "Parent Organization",
        email: "parent@example.com",
        phone: "1234567890",
        fax: "1234567891",
        location: "Parent Location",
        type: "AACEB",
      });
      await parentOrg.save();

      await new Organization({
        name: "Child Organization",
        email: "child@example.com",
        phone: "1234567890",
        fax: "1234567891",
        location: "Child Location",
        type: "AACEB",
        parent: parentOrg._id,
      }).save();

      req.params.parentId = parentOrg._id;

      await organizationController.getOrganizationsByParent(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        organizations: expect.any(Array),
      });
    });
  });
});
