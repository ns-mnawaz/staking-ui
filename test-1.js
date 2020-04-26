'use strict';
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main () {
  // Create our API with a default connection to the local node
  const URL_KUSAMA = 'wss://kusama-rpc.polkadot.io/';
  const URL_LOCAL = 'ws://127.0.0.1:9944';

  // Construct
  const wsProvider = new WsProvider(URL_KUSAMA);
  const api = await ApiPromise.create({ provider: wsProvider });

  let count = 0;

  // Subscribe to the new headers on-chain. The callback is fired when new headers
  // are found, the call itself returns a promise with a subscription that can be
  // used to unsubscribe from the newHead subscription
  const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
    console.log(`Chain is at block: #${header.number}`);
    console.log(header.toHuman());
    console.log(header.toJSON());
  });

  // Subscribe to system events via storage
  const unsubscribeEvent = await api.query.system.events((events) => {
    console.log(`\nReceived ${events.length} events:`);

    // Loop through the Vec<EventRecord>
    events.forEach((record) => {
      // Extract the phase, event and the event types
      const { event, phase } = record;
      const types = event.typeDef;

      // Show what we are busy with
      console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
      console.log(`\t\t${event.meta.documentation.toString()}`);

      // Loop through each of the parameters, displaying the type and data
      event.data.forEach((data, index) => {
        console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
      });
    });
  });

  setTimeout(() => {
    unsubscribe();
    unsubscribeEvent();
    console.log('Unsubscribed');
  }, 20000);

}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
