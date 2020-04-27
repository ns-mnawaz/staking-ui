'use strict';
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main () {
  // Create our API with a default connection to the local node
  const URL_KUSAMA = 'wss://kusama-rpc.polkadot.io/';
  const URL_LOCAL = 'ws://127.0.0.1:9944';

  // Construct
  const wsProvider = new WsProvider(URL_KUSAMA);
  const api = await ApiPromise.create({ provider: wsProvider });
  const validators = await api.query.session.validators();
  console.log('validators: ', validators.toHuman());

  for(let validator of validators.toHuman()){
    console.log(validator);
    const ledger  = await api.query.staking.ledger(validator);
    const proxy  = await api.query.democracy.proxy(validator);
    const bonded  = await api.query.staking.bonded(validator);
    console.log('ledger: ', ledger.toHuman());
    console.log('proxy: ', proxy.toHuman());
    console.log('bonded: ', bonded.toString());
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
