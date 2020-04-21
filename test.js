'use strict';
const { ApiPromise, WsProvider } = require('@polkadot/api');

(async () => {

  const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
  const Bob = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
  const CTRL = 'Cb69hgN9bNWipf6rEGBFeoWt3nocyFQB9XJuJHsLSwdBhyK';
  const URL_KUSAMA = 'wss://kusama-rpc.polkadot.io/';
  const URL_LOCAL = 'ws://127.0.0.1:9944';

  // Construct
  const wsProvider = new WsProvider(URL_KUSAMA);
  const api = await ApiPromise.create({ provider: wsProvider });
  const staking = api.query.staking;

  const validatorCount = await staking.validatorCount();

  console.log('validatorCount: ', validatorCount.toNumber())

  // Do something
  console.log(api.genesisHash.toHex());

  // The length of an epoch (session) in Babe
  console.log(api.consts.babe.epochDuration.toNumber());

  // Retrieve the last timestamp
  const now = await api.query.timestamp.now();

  console.log(`Now: ${now}`);

  // Retrieve the account balance & nonce via the system module
  const { nonce, data: balance } = await api.query.system.account(Alice);

  console.log(`Alice: balance of ${balance.free} and a nonce of ${nonce}`);

  // Retrieve the chain name
  const chain = await api.rpc.system.chain();

  // Retrieve the latest header
  const lastHeader = await api.rpc.chain.getHeader();

  const author = await api.query.authorship.author();

  // Log the information
  console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

  const currentIndex = await api.query.session.currentIndex();

  console.log('currentIndex: ', currentIndex.toHuman());
  console.log('currentIndex: ', currentIndex.toNumber());

  const validators = await api.query.session.validators();

  const validators1 = await api.query.staking.validators(Alice);

  console.log('validators1: ', validators1.toHuman());

  const validators2 = await api.query.staking.validators(CTRL);

  console.log('validators2: ', validators2.toHuman());


  const nominators1  = await api.query.staking.nominators(CTRL);
  console.log('nominators1: ', nominators1.toHuman());

  const valids = await api.query.session.validators();
  console.log('valids: ', valids.toHuman());

  for(let valid of valids.toHuman()){
    console.log(valid);
    const nomi  = await api.query.staking.nominators(valid);
    console.log('nomi: ', nomi.toHuman());
  }
  // const unsub = await api.query.timestamp.now((moment) => {
  //   console.log(`The last block has a timestamp of ${moment}`);
  // });

  process.exit();
})();

