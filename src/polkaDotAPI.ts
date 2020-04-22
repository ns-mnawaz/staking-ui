import * as definitions from './interfaces/definitions';

import { ApiOptions } from '@polkadot/api/types';
import ApiRx from '@polkadot/api/rx/Api';

const { WsProvider } = require('@polkadot/api');

const types = Object.values(definitions).reduce((res, types): object => ({ ...res, ...types }), {});

const options: ApiOptions = {
	provider : new WsProvider('wss://kusama-rpc.polkadot.io/'),
	types: {
		...types,
		// aliases that don't do well as part of interfaces
		'voting::VoteType': 'VoteType',
		'voting::TallyType': 'TallyType',
		// chain-specific overrides
		"Address": 'GenericAddress',
		"Keys": 'SessionKeys4',
		"StakingLedger": 'StakingLedgerTo223',
		"Votes": 'VotesTo230',
		"ReferendumInfo": 'ReferendumInfoTo239',
	},
	// override duplicate type name
	typesAlias: { voting: { Tally: 'VotingTally' } },
};

export = new ApiRx(options);

