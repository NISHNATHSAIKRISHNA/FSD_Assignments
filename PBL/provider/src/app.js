const express = require('express');

const app = express();
app.use(express.json());

// Allow the static frontend page to call the API from the browser.
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
  next();
});

const UNIT_PRICE = 499.9;
const orders = new Map();
let nextId = 2000;

function resetOrders() { orders.clear(); nextId = 2000; }
function seedOrder(order) { orders.set(order.id, { ...order }); }

// Maps our internal order to the public API shape.
function toApi(o) {
  return {
    id: o.id,
    customerName: o.customerName,
    status: o.status,
    total: o.total, // <-- BREAKING CHANGE DEMO: rename this key to  totalAmount: o.total
    items: o.items,
  };
}

app.get('/orders/:id', (req, res) => {
  const order = orders.get(Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(toApi(order));
});

app.post('/orders', (req, res) => {
  const { customerName, items } = req.body || {};
  if (!customerName || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'customerName and items are required' });
  }
  const total = Math.round(items.reduce((s, i) => s + i.qty * UNIT_PRICE, 0) * 100) / 100;
  const order = { id: nextId++, customerName, status: 'CREATED', total, items };
  orders.set(order.id, order);
  const api = toApi(order);
  res.status(201).json({ id: api.id, status: api.status, total: api.total });
});

module.exports = { app, resetOrders, seedOrder };
