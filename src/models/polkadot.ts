
import { API } from './api';
import { AnyJson } from '@polkadot/types/types';

class PolkaDot extends API {

	constructor() {
		super();
	}
	async subscribeNewHeads(callback: any): Promise<any> {
		return await this.api.rpc.chain.subscribeNewHeads(callback);
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
	async chainHeader(): Promise<object> {
		const lastHeader = await this.api.rpc.chain.getHeader();
		return { number: lastHeader.number.toHuman(), hash: lastHeader.hash };
	}
	async version(): Promise<string> {
		const version = await this.api.query.staking.storageVersion();
		return version.toHuman();
	}
	async currentIndex(): Promise<string> {
		const currentIndex = await this.api.query.session.currentIndex();
		return currentIndex.toHuman();
	}
	async activeEra(): Promise<any> {
		const era = await this.api.query.staking.activeEra();
		return era.toJSON();
	}
	async cancelPayout(): Promise<string> {
		const canceledSlashPayout = await this.api.query.staking.canceledSlashPayout();
		return canceledSlashPayout.toHuman();
	}
	async unapplySlash(): Promise<any> {
		const amount = await this.api.query.staking.earliestUnappliedSlash();
		return amount.toHuman();
	}
	async historyDepth(): Promise<any> {
		const depth = await this.api.query.staking.historyDepth();
		return depth.toHuman();
	}
	async minValidatorCount(): Promise<any> {
		const count = await this.api.query.staking.minimumValidatorCount();
		return count.toHuman();
	}
	async bondedEras(): Promise<any> {
		const list = await this.api.query.staking.bondedEras();
		return list.toHuman();
	}
	async founder(): Promise<any> {
		const founder = await this.api.query.society.founder();
		return founder.toHuman();
	}
	async head(): Promise<any> {
		const head = await this.api.query.society.head();
		return head.toHuman();
	}
	async maxMembers(): Promise<any> {
		const maxMembers = await this.api.query.society.maxMembers();
		return maxMembers.toHuman();
	}
	async members(): Promise<any> {
		const members = await this.api.query.society.members();
		return members.toHuman();
	}
	async identity(account: string): Promise<any> {
		const identity =  await this.api.query.identity.identityOf(account);
		return identity.toHuman();
	}
	async iamOnline(account: string): Promise<any> {

		const index =  await this.api.query.session.currentIndex();
		const authoredBlocks = await this.api.query.imOnline.authoredBlocks(index, account);
		const heartbeatAfter = await this.api.query.imOnline.heartbeatAfter();

		return {
			index: index.toHuman(),
			block: authoredBlocks.toHuman(),
			heartbeat: heartbeatAfter.toNumber()
		};
	}
	async nominators(account: string): Promise<any> {
		const nominators  = await this.api.query.staking.nominators(account);
		return nominators.toHuman();
	}
	async slashes(account: string): Promise<any> {
		const slash  = await this.api.query.staking.slashingSpans(account);
		return slash.toHuman();
	}
	async rewards(validator: string): Promise<any> {
		const index =  await this.api.query.session.currentIndex();
		const rewards  = await this.api.query.staking.spanSlash([validator, index]);
		return rewards.toHuman();
	}
	async keys(validator: string): Promise<any> {
		const keys  = await this.api.query.session.nextKeys(validator);
		return keys.toHuman();
	}
	async ledger(validator: string): Promise<any> {
		const ledger  = await this.api.query.staking.ledger(validator);
		const ledgerHuman = ledger.toHuman() || {};

		const ledgerJSON: AnyJson = ledger.toJSON() || {};
		// @ts-ignore
		const active = ledgerJSON.active || 0;
		// @ts-ignore
		const total = ledgerJSON.total || 0;
		// @ts-ignore
		ledgerHuman.percentage = total !== 0 ? Math.round(active / total * 100).toFixed(2) : '0.0';
		return ledgerHuman;
	}
	async bonded(validator: string): Promise<any> {
		const bonded  = await this.api.query.staking.bonded(validator);
		return bonded.toHuman();
	}
}

export = new PolkaDot();
