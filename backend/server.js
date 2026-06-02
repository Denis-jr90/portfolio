const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const Message = require("./models/Message");
const Admin = require("./models/Admin");

const app = express();

/* =========================
   SECURITY + MIDDLEWARE
========================= */

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

/* =========================
   REQUEST LOGGER
========================= */

app.use((req, res, next) => {

  console.log(
    `[${new Date().toLocaleString()}] ${req.method} ${req.url}`
  );

  next();

});

/* =========================
   CUSTOM SECURITY HEADERS
========================= */

app.use((req, res, next) => {

 res.setHeader(
  "X-Powered-By",
  "Mr-Ndenje-Portfolio-API"
);

  res.setHeader(
    "Cache-Control",
    "no-store"
  );

  next();

});

/* =========================
   DATABASE CONNECTION
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("✅ MongoDB Connected");

  })
  .catch((err) => {

    console.log(
      "❌ MongoDB Error:",
      err.message
    );

  });

/* =========================
   HEALTH CHECK ROUTE
========================= */

app.get("/health", (req, res) => {

  res.status(200).json({
    success: true,
    message: "Server healthy 🚀",
    uptime: process.uptime(),
  });

});

/* =========================
   API STATUS ROUTE
========================= */

app.get("/api-status", (req, res) => {

  res.json({
    success: true,
    api: "Portfolio API Running 🚀",
    serverTime: new Date(),
  });

});

/* =========================
   ROOT ROUTE
========================= */

app.get("/", (req, res) => {

  res.json({
    success: true,
    owner: "Mr.Ndenje",
    email: "ndenjedenis@gmail.com",
    status: "Backend Running Successfully 🚀",
  });

});

/* =========================
   VERIFY TOKEN MIDDLEWARE
========================= */

function verifyToken(req, res, next) {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {

    return res.status(401).json({
      success: false,
      message: "Access Denied",
    });

  }

  try {

    const token =
      authHeader.split(" ")[1];

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = verified;

    next();

  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Invalid Token",
    });

  }

}

/* =========================
   CONTACT MESSAGE ROUTE
========================= */

app.post("/messages", async (req, res) => {

  try {

    const {
      name,
      email,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !message
    ) {

      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });

    }

    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message:
        "Message saved successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: "Server Error",
    });

  }

});

/* =========================
   GET ALL MESSAGES
========================= */

app.get(
  "/messages",
  verifyToken,
  async (req, res) => {

    try {

      const messages =
        await Message.find().sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        total: messages.length,
        messages,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error:
          "Error fetching messages",
      });

    }

  }
);

/* =========================
   DELETE MESSAGE
========================= */

app.delete(
  "/messages/:id",
  verifyToken,
  async (req, res) => {

    try {

      const deletedMessage =
        await Message.findByIdAndDelete(
          req.params.id
        );

      if (!deletedMessage) {

        return res.status(404).json({
          success: false,
          message: "Message not found",
        });

      }

      res.json({
        success: true,
        message:
          "Message deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: "Delete failed",
      });

    }

  }
);

/* =========================
   CREATE ADMIN ACCOUNT
========================= */

app.get(
  "/create-admin",
  async (req, res) => {

    try {

      const existingAdmin =
        await Admin.findOne({
          email: "admin@gmail.com",
        });

      if (existingAdmin) {

        return res.json({
          success: false,
          message:
            "Admin already exists",
        });

      }

      const hashedPassword =
        await bcrypt.hash(
          "123456",
          10
        );

      const admin = new Admin({
        email: "admin@gmail.com",
        password:
          hashedPassword,
      });

      await admin.save();

      res.json({
        success: true,
        message:
          "Admin created successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error:
          "Error creating admin",
      });

    }

  }
);

/* =========================
   TEST LOGIN ROUTE
========================= */

app.get(
  "/test-login",
  async (req, res) => {

    try {

      const admin =
        await Admin.findOne({
          email: "admin@gmail.com",
        });

      if (!admin) {

        return res.json({
          success: false,
          message:
            "Admin not found",
        });

      }

      res.json({
        success: true,
        admin,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: "Server Error",
      });

    }

  }
);

/* =========================
   LOGIN ROUTE
========================= */

app.post("/login", async (req, res) => {

  const {
    email,
    password,
  } = req.body;

  try {

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message:
          "Email and password required",
      });

    }

    const admin =
      await Admin.findOne({
        email,
      });

    if (!admin) {

      return res.status(400).json({
        success: false,
        message:
          "Admin not found",
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message:
          "Wrong password",
      });

    }

    const token = jwt.sign(

      {
        id: admin._id,
        email: admin.email,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    res.json({
      success: true,
      token,
      message:
        "Login successful 🚀",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: "Server Error",
    });

  }

});

/* =========================
   PROTECTED ADMIN ROUTE
========================= */

app.get(
  "/admin",
  verifyToken,
  (req, res) => {

    res.json({
      success: true,
      message:
        "Welcome Admin 🚀",
      adminData: req.user,
    });

  }
);

/* =========================
   DASHBOARD STATS
========================= */

app.get(
  "/dashboard-stats",
  verifyToken,
  async (req, res) => {

    try {

      const totalMessages =
        await Message.countDocuments();

      const totalAdmins =
        await Admin.countDocuments();

      res.json({
        success: true,
        totalMessages,
        totalAdmins,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error:
          "Failed to load dashboard stats",
      });

    }

  }
);

/* =========================
   404 ROUTE
========================= */

app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "Route not found",
  });

});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err, req, res, next) => {

  console.log(err.stack);

  res.status(500).json({
    success: false,
    error: "Something went wrong",
  });

});

/* =========================
   SERVER
========================= */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});