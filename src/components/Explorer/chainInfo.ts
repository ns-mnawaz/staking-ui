import m from 'mithril';
import { ListTile, List } from 'polythene-mithril'
import { Search, Shadow, IconButton } from 'polythene-mithril';
import polkaDot from '../../models/polkadot';
import icons from '../Common/icons';
import Loader from '../Common/loader';

const createUserListTile = (title: string, subtitle: string) =>
	m(ListTile, {
		title,
		subtitle,
		front: icons.Barcode,
		element: m.route.Link,
		url: {
			href: `/validator/${title}`
		}
	});

const SearchIcon = {
	view: ({ attrs }: {attrs: any}) =>
		m(IconButton, {
			icon: { svg: icons.search },
			ink: false,
			events: { onclick: attrs.search },
		})
};

const ClearButton = {
	view: ({ attrs }: {attrs: any}) =>
		m(IconButton, {
			icon: { svg: icons.clear },
			ink: false,
			events: { onclick: attrs.clear },
		})
};

const ChainInfo = () => {

	const model = {
		count: '0',
		validators: [],
		chain: '',
		lastBlock: '0000000',
		loading: false
	};

	const state = {
		value: '',
		clear: () => state.value = '',
		search: (element: any) => {
			// search
			console.log('integrate search api', element);
		}
	};

	return {

		async oncreate() {
			model.loading = true;
			await polkaDot.set();
			const [count, validators, chain, lastBlock] = await Promise.all([
				polkaDot.setValidatorCount(),
				polkaDot.setValidators(),
				polkaDot.setChain(),
				polkaDot.lastBlock()
			]);

			model.count = count;
			model.validators = validators;
			model.chain = chain;
			model.lastBlock = lastBlock;
			model.loading = false;
		},
		view: () => {
			return m('.row.p-top-24',
				model.loading ? m(Loader, { loading: model.loading }) : m('div',
					m('.layout.horizontal', [
						m('.flex.one',
							m(ListTile, {
								title: model.count,
								subtitle: 'Validators',
								highSubtitle: `#${model.lastBlock}`
							})
						),
						m('.flex.four',
							m(Search, Object.assign({}, { className: 'margin-12',
								textfield: {
									label: 'Search',
									onChange: ({ value }: { value: string }) =>  ( state.value = value ),
									value: state.value
								},
								before: m(Shadow),
								fullWidth: true
							})
							)
						),
						m('.flex.one',
							m(ListTile, {
								title: '0',
								subtitle: 'Nominators',
								highSubtitle: '#0000000'
							})
						)
					]),
					m('.row.p-top-24', [
						m('.component', [
							m(List, {
								header: { title: 'Validators' },
								border: true,
								tiles: model.validators.map((validator) => createUserListTile(validator, model.chain))
							})
						])
					])
				)
			);
		}
	};
};

export default ChainInfo;
