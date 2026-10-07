/**
 * OrdersClient - the code the frontend uses to talk to the Orders API.
 * Works in the browser (window.OrdersClient) and in Node (module.exports).
 */
(function (root) {
  class OrdersClient {
    constructor(baseUrl) {
      this.baseUrl = baseUrl.replace(/\/$/, '');
    }

    // Returns an order object, or null when the API says 404.
    async getOrder(id) {
      const res = await fetch(`${this.baseUrl}/orders/${id}`, {
        headers: { Accept: 'application/json' },
      });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Orders API error: ${res.status}`);
      const o = await res.json();
      // The frontend DEPENDS on these fields -> they become the contract.
      return {
        id: o.id,
        customerName: o.customerName,
        status: o.status,
        total: o.total,
        items: o.items,
      };
    }

    async createOrder(customerName, items) {
      const res = await fetch(`${this.baseUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ customerName, items }),
      });
      if (!res.ok) throw new Error(`Orders API error: ${res.status}`);
      const o = await res.json();
      return { id: o.id, status: o.status, total: o.total };
    }
  }

  // Small UI helper that uses `total` - so a missing `total` breaks the UI.
  function formatOrderSummary(order) {
    return `Order #${order.id} for ${order.customerName} [${order.status}] - Rs. ${order.total.toFixed(2)}`;
  }

  const api = { OrdersClient, formatOrderSummary };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.OrdersApp = api;
})(typeof window !== 'undefined' ? window : globalThis);
