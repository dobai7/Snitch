import { body, validationResult } from "express-validator";

// Common validate middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      errors: errors.array().map(err => ({ field: err.path, message: err.msg })),
    });
  }

  next();
};

// Register validation rules
export const registerValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  body("phone")
    .trim()
    .notEmpty().withMessage("Phone is required")
    .isMobilePhone("any").withMessage("Invalid phone number"),

  body("role")
    .optional()
    .isIn(["buyer", "seller"]).withMessage("Role must be buyer or seller"),

    validate
];

// Login validation rules
export const loginValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required"),

    validate
];

export const emailValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),

    validate
]

export const passwordValidator = [
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

    validate
]