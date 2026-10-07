# Contract Testing between a Frontend and an Orders API (Pact + Pact Broker)

```
orders-contract-testing/
├── docker-compose.yml            # Pact Broker + Postgres
├── .github/workflows/contract-tests.yml   # CI pipeline
├── consumer/                     # "OrdersFrontend" (consumer)
│   ├── src/ordersClient.js
│   ├── public/index.html
│   ├── test/orders.pact.test.js  # writes the contract
│   └── scripts/publish.js        # publishes contract to broker
└── provider/                     # "OrdersAPI" (provider)
    ├── src/app.js  src/server.js
    └── test/provider.pact.test.js  # verifies the contract
```

## Prerequisites
Node.js 18+ (20 recommended), Docker Desktop, Git, a GitHub account.

## Run order
```bash
# 1. Start the broker
docker compose up -d                      # open http://localhost:9292

# 2. Consumer: generate + publish the contract
cd consumer && npm install
npm test                                  # creates consumer/pacts/OrdersFrontend-OrdersAPI.json
npm run pact:publish

# 3. Provider: verify the contract (GOOD state -> passes)
cd ../provider && npm install
# Mac/Linux:
PACT_BROKER_BASE_URL=http://localhost:9292 PUBLISH_VERIFICATION=true npm test
# Windows PowerShell:
#   $env:PACT_BROKER_BASE_URL="http://localhost:9292"; $env:PUBLISH_VERIFICATION="true"; npm test
```

## Break the API on purpose
In `provider/src/app.js`, inside `toApi()`, change

    total: o.total,
to
    totalAmount: o.total,

Run the provider test again -> it FAILS (consumer expects `total`).
Commit + push -> the GitHub Actions run turns red.
Revert the line -> green again.

## Optional: run the UI
`cd provider && npm start`, then open `consumer/public/index.html` in a browser.
