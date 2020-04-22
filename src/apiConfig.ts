import * as definitions from './interfaces/definitions';
import endpoints from './constants/url';

import { ApiOptions } from '@polkadot/api/types';

import { WsProvider } from '@polkadot/api';

const apiTypes = Object.values(definitions).reduce((res, types): object => ({ ...res, ...types }), {});

const options: ApiOptions = {
	provider : new WsProvider(endpoints.KUSAM),
	types: {
		...apiTypes,
		// aliases that don't do well as part of interfaces
		'voting::VoteType': 'VoteType',
		'voting::TallyType': 'TallyType',
		// chain-specific overrides
		'Address': 'GenericAddress',
		'Keys': 'SessionKeys4',
		'StakingLedger': 'StakingLedgerTo223',
		'Votes': 'VotesTo230',
		'ReferendumInfo': 'ReferendumInfoTo239',
	},
	// override duplicate type name
	typesAlias: { voting: { Tally: 'VotingTally' } },
};

export = options;

