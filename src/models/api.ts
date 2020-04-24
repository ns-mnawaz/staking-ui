import {ApiPromise, WsProvider} from '@polkadot/api';

let instance: any = null;

async function createInstance (): Promise<ApiPromise> {
	if (instance === null) {
	  try {
			console.log(' iinsta');
			const URL_KUSAMA = 'wss://kusama-rpc.polkadot.io/';
			const URL_LOCAL = 'ws://127.0.0.1:9944';
			// Construct
			const wsProvider = new WsProvider(URL_LOCAL);

			const api = await ApiPromise.create({ provider: wsProvider });

			const ready = await api.isReady;

			console.log('ready : ', ready);

			const count = await api.query.staking.validatorCount();

			console.log('count : ', count.toHuman());
			await api.isReady;
			instance = api;
		} catch (e) {
	    console.log('--- handle error', e);
		}

	}

	console.log('---- return instance', instance);

	return instance;
}

interface Interface {
	api: ApiPromise;
	set(url: string): void
}

export class API implements Interface {
	api: ApiPromise;

	constructor() {
		this.api = new ApiPromise();
	}

	async set() {
		this.api = await createInstance();
	}

}
