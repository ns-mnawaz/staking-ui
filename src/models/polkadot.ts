
import { API } from './api';

class PolkaDot extends API {

	constructor() {
		super();
	}

	async validatorCount(): Promise<string> {

		const count = await this.api.query.staking.validatorCount();

		return count.toHuman();
	}

	async validators(): Promise<any> {

		const list = await this.api.query.session.validators();

		return list.toHuman();
	}

	async chain(): Promise<any> {

		const name = await this.api.rpc.system.chain();

		return name.toHuman();
	}

	async chainHeader(): Promise<any> {

		const lastHeader = await this.api.rpc.chain.getHeader();

		return lastHeader.number.toHuman();
	}

}

export = new PolkaDot();
