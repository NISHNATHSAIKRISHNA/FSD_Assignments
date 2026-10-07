const path = require('path');
const { Verifier } = require('@pact-foundation/pact');
const { app, resetOrders, seedOrder } = require('../src/app');

const PORT = 8081;
const BROKER = process.env.PACT_BROKER_BASE_URL; // e.g. http://localhost:9292

describe('OrdersAPI provider verification', () => {
  let server;
  beforeAll((done) => { server = app.listen(PORT, done); });
  afterAll((done) => { server.close(done); });

  it('honours all consumer contracts', async () => {
    const opts = {
      provider: 'OrdersAPI',
      providerBaseUrl: `http://localhost:${PORT}`,
      logLevel: 'info',
      // Put the API into the state each interaction needs:
      stateHandlers: {
        'order 1001 exists': async () => {
          resetOrders();
          seedOrder({
            id: 1001, customerName: 'Asha Rao', status: 'SHIPPED', total: 2499.5,
            items: [{ sku: 'BOOK-101', qty: 2 }],
          });
        },
        'order 9999 does not exist': async () => { resetOrders(); },
        'orders can be created': async () => { resetOrders(); },
      },
    };

    if (BROKER) {
      // Broker mode (used in CI and for the full demo)
      Object.assign(opts, {
        pactBrokerUrl: BROKER,
        consumerVersionSelectors: [{ mainBranch: true }],
        providerVersion: process.env.GIT_COMMIT || 'local-' + Date.now(),
        providerVersionBranch: process.env.GIT_BRANCH || 'main',
        publishVerificationResult: process.env.PUBLISH_VERIFICATION === 'true',
      });
    } else {
      // File mode: quick local check without a broker
      opts.pactUrls = [
        path.resolve(__dirname, '..', '..', 'consumer', 'pacts', 'OrdersFrontend-OrdersAPI.json'),
      ];
    }

    await new Verifier(opts).verifyProvider();
  });
});
