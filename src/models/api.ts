import {ApiPromise} from '@polkadot/api';
import apiConfig from '../apiConfig';

let instance: any = null;

async function createInstance (): Promise<ApiPromise> {
	if (instance === null) {
		const api = await ApiPromise.create(apiConfig);

		// const ready = await api.isReady;
		// const count = await api.query.staking.validatorCount();
		//
		// console.log('ready : ', ready);
		// console.log('count : ', count);

		instance = api;
	}
	return instance;
}

interface Interface {
	loading: boolean;
	api: ApiPromise;
	staking: any;
	session: any;
	system: any;
	set(url: string): void
}

export class API implements Interface {
	loading: boolean;
	api: ApiPromise;
	staking: any;
	session: any;
	system: any;

	constructor() {
		this.loading = false;
		this.api = new ApiPromise();
	}

	async set(url?: string) { this.loading = true;
		this.api = await createInstance();
		this.staking = this.api.query.staking;
		this.session = this.api.query.session;
		this.system = this.api.rpc.system;

		this.loading = false;
	}

}
