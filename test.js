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
  const index =  await api.query.session.currentIndex();
  console.log('index: ', index.toHuman());

  for(let validator of validators.toHuman()){
    console.log(validator);
    const keys  = await api.query.session.nextKeys(validator);
    console.log('slash: ', keys.toHuman());
    console.log('slash: ', keys.toJSON());
    console.log('slash: ', keys.toHex());
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
