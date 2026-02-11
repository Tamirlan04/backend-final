const Order = require('../models/Order');

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'email');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    next(err);
  }
};
