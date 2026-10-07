// Publishes the generated pact file(s) to the Pact Broker.
const { execSync } = require('child_process');

const broker = process.env.PACT_BROKER_BASE_URL || 'http://localhost:9292';
const branch = process.env.GIT_BRANCH || 'main';
let version = process.env.GIT_COMMIT;
if (!version) {
  try { version = execSync('git rev-parse --short HEAD').toString().trim(); }
  catch (e) { version = '1.0.0-' + Date.now(); }
}

const cmd =
  `npx pact-broker publish ./pacts ` +
  `--consumer-app-version ${version} --branch ${branch} --broker-base-url ${broker}`;
console.log('> ' + cmd);
execSync(cmd, { stdio: 'inherit' });
