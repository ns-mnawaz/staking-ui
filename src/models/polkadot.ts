
import { API } from './api';

class polkaDot extends API {
  validatorCount: number;

  constructor() {
    super();
    this.validatorCount = 0;
  }

  async setValidatorCount(): Promise<number> {
    this.loading = true;
    const count = await this.staking.validatorCount();
    this.loading = false;
    this.validatorCount = count.toNumber();
    return this.validatorCount;
  }
}

export = new polkaDot();