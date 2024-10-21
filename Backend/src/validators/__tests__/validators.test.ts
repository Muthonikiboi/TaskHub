import { Request, Response, NextFunction } from "express";
import { registerValidator, updateUserValidator } from "../validators"; // Adjust path if needed

describe("Request Validators", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    next = jest.fn();
  });

  describe("registerValidator", () => {
    it("should pass validation with valid data", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
        age: 25,
        city: "Test City",
      };

      await registerValidator(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should fail validation with invalid email", async () => {
      req.body = {
        email: "invalid-email",
        password: "password123",
        name: "Test User",
        age: 25,
        city: "Test City",
      };

      await registerValidator(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.arrayContaining([
            expect.objectContaining({ msg: "Invalid email address" }),
          ]),
        })
      );
    });

    // Add more test cases for other invalid data scenarios
    it("should fail validation with short password", async () => {
      req.body = {
        email: "test@example.com",
        password: "short", // Password less than 6 characters
        name: "Test User",
        age: 25,
        city: "Test City",
      };

      await registerValidator(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.arrayContaining([
            expect.objectContaining({
              msg: "Password must be at least 6 characters long",
            }),
          ]),
        })
      );
    });

    it("should fail validation with missing name", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
        age: 25,
        city: "Test City",
      }; // Missing name property

      await registerValidator(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.arrayContaining([
            expect.objectContaining({ msg: "Name is required" }),
          ]),
        })
      );
    });

    it("should fail validation with missing city", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
        age: 25,
      }; // Missing city property

      await registerValidator(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.arrayContaining([
            expect.objectContaining({ msg: "City is required" }),
          ]),
        })
      );
    });

    it("should fail validation with invalid age", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
        age: 15, // Age less than 18
        city: "Test City",
      };

      await registerValidator(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.arrayContaining([
            expect.objectContaining({ msg: "Age must be at least 18" }),
          ]),
        })
      );
    });

    // (e.g., short password, missing name, invalid age, missing city)
  });

  describe("updateUserValidator", () => {
    it("should pass validation with valid data", async () => {
      req.body = {
        email: "test@example.com",
        age: 30,
      };

      await updateUserValidator(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should fail validation with invalid email (even if optional)", async () => {
      req.body = {
        email: "invalid-email",
      };

      await updateUserValidator(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.arrayContaining([
            expect.objectContaining({ msg: "Invalid email address" }),
          ]),
        })
      );
    });

    it("Age should be 18 years or greater", () => {});

    // Add more test cases for other invalid data scenarios
    // (e.g., short password, invalid age)
  });
});
