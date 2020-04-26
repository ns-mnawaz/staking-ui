const dev = {
	edgeware: {
		ENDPOINT: 'ws://127.0.0.1:9944',
	}
};

const prod = {
	edgeware: {
		ENDPOINT: 'wss://kusama-rpc.polkadot.io/',
	}
};

const config = process.env.APP_STAGE === 'development' ? dev : prod;

export default {
	REFRESH: 10000,
	...config
};
