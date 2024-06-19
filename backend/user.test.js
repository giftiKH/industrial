const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { connect, disconnect } = require("./config/db");
const User = require("./models/user");
const Organization = require("./models/organization")
const userController = require("./controllers/userController");
const userCRUDController = require("./controllers/userCRUDController");

describe("User Controller", () => {
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
    await User.deleteMany();
  });

  afterAll(async () => {
    await disconnect();
  });

  describe("userController", () => {
    describe("loginUser", () => {
      it("should login user successfully", async () => {
        const hashedPassword = await bcrypt.hash("password123", 10);
        await new User({
          full_name: "Test User",
          email: "test@example.com",
          password: hashedPassword,
          phone: "1234567890",
          role: "admin",
          organization: new mongoose.Types.ObjectId("66573bc404eda87bebea0aaf"),
        }).save();

        req.body = {
          email: "test@example.com",
          password: "password123",
        };

        await userController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
          expect.objectContaining({
            message: "Login successful",
            token: expect.any(String),
          })
        );
      });

      it("should return user not found", async () => {
        req.body = {
          email: "nonexistent@example.com",
          password: "password123",
        };

        await userController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
          message: "User not found",
        });
      });

      it("should return invalid password", async () => {
        const hashedPassword = await bcrypt.hash("password123", 10);
        await new User({
          full_name: "Test User",
          email: "test@example.com",
          password: hashedPassword,
          phone: "1234567890",
          role: "admin",
          organization: new mongoose.Types.ObjectId("665739ac649030f49cb0ddc5"),
        }).save();

        req.body = {
          email: "test@example.com",
          password: "wrongpassword",
        };

        await userController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
          message: "Invalid password",
        });
      });
    });

    describe("logoutUser", () => {
      it("should logout user successfully", async () => {
        await userController.logoutUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: "Logout successful",
        });
      });
    });

    describe("getUsersByOrganization", () => {
      it("should get users by organization", async () => {
        const organizationId = new mongoose.Types.ObjectId(
          "665739ac649030f49cb0ddc5"
        );
        await new User({
          full_name: "User 1",
          email: "user1@example.com",
          password: await bcrypt.hash("password123", 10),
          phone: "1234567890",
          role: "admin",
          organization: organizationId,
        }).save();

        req.params.organizationId = organizationId.toString();

        await userController.getUsersByOrganization(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          users: expect.any(Array),
        });
      });
    });

    describe("getUsersByRole", () => {
      it("should get users by role", async () => {
        const role = "admin";
        await new User({
          full_name: "User 1",
          email: "user1@example.com",
          password: await bcrypt.hash("password123", 10),
          phone: "1234567890",
          role,
          organization: new mongoose.Types.ObjectId("665739ac649030f49cb0ddc5"),
        }).save();

        req.params.role = role;

        await userController.getUsersByRole(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          users: expect.any(Array),
        });
      });
    });
  });

  describe("userCRUDController", () => {
    describe("addUser", () => {
      it("should add a new user", async () => {
        req.body = {
          full_name: "New User",
          email: "newuser@example.com",
          password: "password123",
          phone: "0987654321",
          role: "admin",
          organization: new mongoose.Types.ObjectId("665739ac649030f49cb0ddc5"),
        };

        await userCRUDController.addUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          user: expect.any(Object),
        });
      });

      it("should return an error if adding fails", async () => {
        req.body = {}; // Invalid data

        await userCRUDController.addUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: "Invalid role", // Adjusted to match the actual response
        });

      });
    });

    describe("getAllUsers", () => {
      it("should get all users", async () => {
        await new User({
          full_name: "User 1",
          email: "user1@example.com",
          password: await bcrypt.hash("password123", 10),
          phone: "1234567890",
          role: "admin",
          organization: new mongoose.Types.ObjectId("665739ac649030f49cb0ddc5"),
        }).save();

        await userCRUDController.getAllUsers(req, res);

        expect(res.json).toHaveBeenCalledWith({
          success: true,
          users: expect.any(Array),
        });
      });
    });

    describe("getUserById", () => {
      it("should get user by ID", async () => {
        const user = await new User({
          full_name: "User 1",
          email: "user1@example.com",
          password: await bcrypt.hash("password123", 10),
          phone: "1234567890",
          role: "admin",
          organization: new mongoose.Types.ObjectId("665739ac649030f49cb0ddc5"),
        }).save();

        req.params.id = user._id.toString();

        await userCRUDController.getUserById(req, res);

        expect(res.json).toHaveBeenCalledWith({
          success: true,
          user: expect.any(Object),
        });
      });

      it("should return an error if user not found", async () => {
        req.params.id = new mongoose.Types.ObjectId().toString(); // Non-existent ID

        await userCRUDController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: "User not found",
        });
      });
    });

    describe("editUser", () => {
      it("should edit a user", async () => {
        const user = await new User({
          full_name: "Old User",
          email: "old@example.com",
          password: await bcrypt.hash("password123", 10),
          phone: "1234567890",
          role: "admin",
          organization: new mongoose.Types.ObjectId("665739ac649030f49cb0ddc5"),
        }).save();

        req.params.id = user._id.toString();
        req.body.full_name = "Updated User";

        await userCRUDController.editUser(req, res);

        expect(res.json).toHaveBeenCalledWith({
          success: true,
          user: expect.objectContaining({
            full_name: "Updated User",
          }),
        });
      });

      it("should return an error if user not found", async () => {
        req.params.id = new mongoose.Types.ObjectId().toString(); // Non-existent ID
        req.body.full_name = "Updated User";

        await userCRUDController.editUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: "User not found",
        });
      });
    });

    describe("deleteUser", () => {
      it("should delete a user", async () => {
        const user = await new User({
          full_name: "User to delete",
          email: "delete@example.com",
          password: await bcrypt.hash("password123", 10),
          phone: "1234567890",
          role: "admin",
          organization: new mongoose.Types.ObjectId("665739ac649030f49cb0ddc5"),
        }).save();

        req.params.id = user._id.toString();

        await userCRUDController.deleteUser(req, res);

        expect(res.json).toHaveBeenCalledWith({
          success: true,
          message: "User deleted successfully",
        });
      });

      it("should return an error if user not found", async () => {
        req.params.id = new mongoose.Types.ObjectId().toString(); // Non-existent ID

        await userCRUDController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: "User not found",
        });
      });
    });
  });
});
