const express = require("express");
const Order = require("../models/Order");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/adminMiddleware");

const router = express.Router();

/*
  CREATE ORDER (user)
*/
router.post("/", auth, async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    const { name, phone, type, deadline } = req.body;

    if (!name || !phone || !type || !deadline) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    // безопасно получаем userId
    const userId = req.user._id || req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    const order = await Order.create({
      userId,
      name,
      phone,
      printType: type,
      deadline,
      quantity: 1,
      status: "pending"
    });

    res.status(201).json(order);

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/*
  GET MY ORDERS (user)
*/
router.get("/my", auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const orders = await Order.find({ userId });
    res.json(orders);

  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/*
  GET ALL ORDERS (admin)
*/
router.get("/", auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "email");
    res.json(orders);

  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/*
  UPDATE STATUS (admin)
*/
router.patch("/:id/status", auth, admin, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);

  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
