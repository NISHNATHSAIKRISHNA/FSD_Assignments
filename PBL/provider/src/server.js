const { app, seedOrder } = require('./app');

// Demo data so the UI works when you run the API manually.
seedOrder({
  id: 1001, customerName: 'Asha Rao', status: 'SHIPPED', total: 2499.5,
  items: [{ sku: 'BOOK-101', qty: 2 }],
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Orders API listening on http://localhost:${PORT}`));
