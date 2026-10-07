const path = require('path');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const { OrdersClient, formatOrderSummary } = require('../src/ordersClient');

const { like, eachLike, number, string, integer, regex } = MatchersV3;

const provider = new PactV3({
  consumer: 'OrdersFrontend',
  provider: 'OrdersAPI',
  dir: path.resolve(__dirname, '..', 'pacts'), // contract file is written here
  logLevel: 'warn',
});

const JSON_HEADER = {
  'Content-Type': regex(/application\/json.*/, 'application/json'),
};

describe('OrdersFrontend -> OrdersAPI contract', () => {
  it('gets an existing order', async () => {
    provider
      .given('order 1001 exists')
      .uponReceiving('a request for order 1001')
      .withRequest({
        method: 'GET',
        path: '/orders/1001',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: JSON_HEADER,
        body: {
          id: integer(1001),
          customerName: string('Asha Rao'),
          status: string('SHIPPED'),
          total: number(2499.5), // <-- the field the frontend relies on
          items: eachLike({ sku: string('BOOK-101'), qty: integer(2) }),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const client = new OrdersClient(mockServer.url);
      const order = await client.getOrder(1001);
      expect(order.id).toBe(1001);
      expect(typeof order.total).toBe('number');
      expect(formatOrderSummary(order)).toContain('Asha Rao');
    });
  });

  it('gets 404 for an unknown order', async () => {
    provider
      .given('order 9999 does not exist')
      .uponReceiving('a request for order 9999')
      .withRequest({
        method: 'GET',
        path: '/orders/9999',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 404,
        headers: JSON_HEADER,
        body: { error: string('Order not found') },
      });

    await provider.executeTest(async (mockServer) => {
      const client = new OrdersClient(mockServer.url);
      expect(await client.getOrder(9999)).toBeNull();
    });
  });

  it('creates a new order', async () => {
    provider
      .given('orders can be created')
      .uponReceiving('a request to create an order')
      .withRequest({
        method: 'POST',
        path: '/orders',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: { customerName: 'Ravi Kumar', items: [{ sku: 'BOOK-101', qty: 1 }] },
      })
      .willRespondWith({
        status: 201,
        headers: JSON_HEADER,
        body: {
          id: integer(2000),
          status: string('CREATED'),
          total: number(499.9),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const client = new OrdersClient(mockServer.url);
      const created = await client.createOrder('Ravi Kumar', [{ sku: 'BOOK-101', qty: 1 }]);
      expect(created.status).toBe('CREATED');
      expect(typeof created.total).toBe('number');
    });
  });
});
