import m from 'mithril';
import { ListTile, List } from 'polythene-mithril'
import { Search, Shadow } from 'polythene-mithril';
import polkaDot from '../../models/polkadot';
import icons from '../Common/icons';
import Loader from '../Common/loader';
import Button from '../Common/button';

const SearchIcon = Button.search;
const ClearButton = Button.clear;

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

const Tile = (title: string, subtitle: string, highSubtitle: string) =>
  m(ListTile, {
    title: '0',
    subtitle: 'Nominators',
    highSubtitle: '#0000000'
  });

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
		console.log('integrate search api', element); // tslint:disable-line no-console
	}
};

const ChainInfo: m.Component =  {

		async oncreate() {

			model.loading = true;

			await polkaDot.set();
			const [count, validators, chain, lastBlock] = await Promise.all([
				polkaDot.validatorCount(),
				polkaDot.validators(),
				polkaDot.chain(),
				polkaDot.chainHeader()
			]);

			model.count = count;
			model.validators = validators;
			model.chain = chain;
			model.lastBlock = lastBlock;
			model.loading = false;
			m.redraw();

		},
		view: () => {
				return m('.row.p-top-24',
					model.loading ? m(Loader, {loading: model.loading}) : m('div',
						m('.layout.horizontal', [
							m('.flex.one',
								m(ListTile, {
									title: model.count,
									subtitle: 'Validators',
									highSubtitle: `#${model.lastBlock}`
								})
							),
							m('.flex.four',
								m(Search, {
										className: 'margin-12',
										textfield: {
											label: 'Search',
											onChange: ({value}: { value: string }) => (state.value = value),
											value: state.value
										},
										before: m(Shadow),
										fullWidth: true,
										buttons: {
											none: {},
											focus: {
												before: m(ClearButton, {clear: state.clear}),
												after: m(SearchIcon, {search: state.search})
											},
											focus_dirty: {
												before: m(ClearButton, {clear: state.clear}),
												after: m(SearchIcon, {search: state.search})
											},
											dirty: {
												before: m(ClearButton, {clear: state.clear}),
												after: m(SearchIcon, {search: state.search})
											}
										}
									}
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
									header: {title: 'Validators'},
									border: true,
									tiles: model.validators.map((validator) => createUserListTile(validator, model.chain))
								})
							])
						])
					)
				);
			}
	};

export default ChainInfo;
