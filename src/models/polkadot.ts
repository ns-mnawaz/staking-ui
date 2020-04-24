
import { API } from './api';

class PolkaDot extends API {

	constructor() {
		super();
	}

	async setValidatorCount(): Promise<string> {

		const count = await this.api.query.staking.validatorCount();

		return count.toHuman();
	}

	async setValidators(): Promise<any> {

		const list = await this.api.query.session.validators();

		return list.toHuman();
	}

	async setChain(): Promise<any> {

		return await this.api.rpc.system.chain();
	}

	async lastBlock(): Promise<any> {

		const lastHeader = await this.api.rpc.chain.getHeader();
		const lastBlockNo = lastHeader.number.toHuman();

		return lastBlockNo;
	}

}

export = new PolkaDot();
