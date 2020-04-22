
import { API } from './api';

class PolkaDot extends API {
	validatorCount: number;
	validators: string[];

	constructor() {
		super();
		this.validatorCount = 0;
		this.validators = [];
	}

	async setValidatorCount(): Promise<number> {
		this.loading = true;
		const count = await this.staking.validatorCount();
		this.loading = false;
		this.validatorCount = count.toNumber();
		return this.validatorCount;
	}

	async setValidators(): Promise<string[]> {
		this.loading = true;

		const list = await this.session.validators();
		this.validators = list.toHuman();

		this.loading = false;
		return this.validators;
	}
}

export = new PolkaDot();
