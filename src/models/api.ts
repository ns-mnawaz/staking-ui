import {ApiPromise} from '@polkadot/api';
import apiConfig from '../apiConfig';

let instance: any = null;

async function createInstance (): Promise<ApiPromise> {
	if (instance === null) {
	  try {
	    console.log(' iinsta');
			const api = await ApiPromise.create(apiConfig);

			// const ready = await api.isReady;
			// const count = await api.query.staking.validatorCount();
			//
			// console.log('ready : ', ready);
			// console.log('count : ', count);
			await api.isReady;
			instance = api;
		} catch (e) {
	    console.log('--- handle error', e);
		}

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
	chain: any;

	constructor() {
		this.loading = false;
		this.api = new ApiPromise();
	}

	async set() {
	  this.loading = true;

		this.api = await createInstance();
		await this.api.isReady;

		this.staking = this.api.query.staking;
		this.session = this.api.query.session;
		this.system = this.api.rpc.system;
		this.chain = this.api.rpc.chain;

		this.loading = false;
	}

}
