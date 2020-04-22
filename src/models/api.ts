import {ApiPromise, WsProvider} from '@polkadot/api';
let instance: any = null;

async function createInstance (url: string): Promise<ApiPromise> {
	if (instance === null) {
		const wsProvider = new WsProvider(url);
		instance = await ApiPromise.create({provider: wsProvider});
	}
	return instance;
}

interface Interface {
	loading: boolean;
	api: ApiPromise;
	staking: any;
	set(url: string): void
}

export class API implements Interface {
	loading: boolean;
	api: ApiPromise;
	staking: any;

	constructor() {
		this.loading = false;
		this.api = new ApiPromise();
	}

	async set(url?: string) {
		url = url || 'ws://127.0.0.1:9944';
		this.api = await createInstance(url);
	}

}
