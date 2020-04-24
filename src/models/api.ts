import {ApiPromise} from '@polkadot/api';
import apiConfig from '../apiConfig';

let instance: any = null;

async function createInstance (): Promise<ApiPromise> {
	if (instance === null) {

	  try {
	    const api = await ApiPromise.create(apiConfig);
			await api.isReady;
			console.log('@polkadot/api connection successful.'); // tslint:disable-line no-console
			instance = api;
		} catch (e) {
	    console.error('@polkadot/api connection error.', e); // tslint:disable-line no-console
		}

	}

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
