
import { API } from './api';

class PolkaDot extends API {
	validatorCount: string;
	chainName: string;
	validators: string[];
	lastBlockNo: string;

	constructor() {
		super();
		this.validatorCount = '0';
		this.validators = [];
		this.chainName = '';
		this.lastBlockNo = '0000000';
	}

	async setValidatorCount(): Promise<string> {
		this.loading = true;
		const count = await this.staking.validatorCount();
		this.loading = false;
		this.validatorCount = count.toHuman();
		return this.validatorCount;
	}

	async setValidators(): Promise<string[]> {
		this.loading = true;

		const list = await this.session.validators();
		this.validators = list.toHuman();

		this.loading = false;
		return this.validators;
	}

	async setChain(): Promise<string> {

		this.loading = true;
		this.chainName = await this.system.chain();
		this.loading = false;

		return this.chainName;
	}

	async lastBlock(): Promise<string> {

		this.loading = true;
		const lastHeader = await this.chain.getHeader();
		this.lastBlockNo = lastHeader.number.toHuman();
		this.loading = false;

		return this.lastBlockNo;
	}

}

export = new PolkaDot();
