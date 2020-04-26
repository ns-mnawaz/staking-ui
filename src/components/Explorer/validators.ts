import m from 'mithril';
import { ListTile, List, Search, Shadow  } from 'polythene-mithril'
import polkaDot from '../../models/polkadot';
import icons from '../Common/icons';
import Loader from '../Common/loader';
import Button from '../Common/button';
import config from '../../config';

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

const model = {
	loading: true,
	count: '0',
	validators: [],
	validatorsCopy: [],
	chain: '',
	lastBlock: '0000000',
	lastBlockHash: '',
	currentIndex: '',
	timeoutId: 0,
	header: {
		number: '',
		parentHash: '',
		stateRoot: ''
	},
	newHead: (header: any) => { model.header = header.toHuman();
		m.redraw();
	},
	unsubscribe: () => {},
	filter: ( match: string ) => {

		if (!match) {
			model.validators = model.validatorsCopy;
		} else {
			model.validators = model.validatorsCopy.filter(( validator: string ) => {
				match = match.toLowerCase();
				validator = validator.toLowerCase();
				return typeof validator === 'string' && validator.indexOf(match) > -1;
			});
		}

		m.redraw();
	}
};

const state = {
	value: '',
	clear: () => {
		model.filter('');
		state.value = '';
	},
	search: () => {
		model.filter(state.value);
	}
};

async function apiCall() {

	const [count, validators, chain, lastBlock, currentIndex] = await Promise.all([
		polkaDot.validatorCount(),
		polkaDot.validators(),
		polkaDot.chain(),
		polkaDot.chainHeader(),
		polkaDot.currentIndex()
	]);

	const validatorList = validators || [];

	model.count = count;
	model.validators = validatorList;
	model.validatorsCopy = validatorList;
	model.chain = chain;
	model.lastBlock = lastBlock.number;
	model.lastBlockHash = lastBlock.hash;
	model.currentIndex = currentIndex;

	model.loading = false;
	m.redraw();

}

async function subscribers() {

	const [unsubscribe] = await Promise.all([
		polkaDot.subscribeNewHeads(model.newHead)
	]);

	model.unsubscribe = unsubscribe;

}

const Validators: m.Component =  {

		async oncreate() {

			await polkaDot.set();
			model.timeoutId = window.setInterval(apiCall, config.REFRESH);
			await subscribers();

		},
		onremove() {
			clearTimeout(model.timeoutId);
			model.unsubscribe();
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
						m('.layout.horizontal.p-top-24', [
							m('.flex.one',
								m(ListTile, {
									title: 'New Head'
								})
							)
						]),
						m('.layout.horizontal', [
							m('.flex.one',
								m(ListTile, {
									title: 'Number',
									subtitle: 'Parent Hash',
									highSubtitle: 'State Root'
								})
							),
							m('.flex.five',
								m(ListTile, {
									title: model.header.number,
									subtitle: model.header.parentHash,
									highSubtitle: model.header.stateRoot
								})
							)
						]),
						m('.layout.horizontal.p-top-24', [
							m('.flex.three.p-3',
								m(ListTile, {
									title: 'Last Block',
									subtitle: `#${model.lastBlockHash}`,
									highSubtitle: `#${model.lastBlock}`
								})
							),
							m('.flex.one.p-3',
								m(ListTile, {
									title: 'Current Index',
									subtitle: model.currentIndex,
									highSubtitle: model.chain
								})
							)
						]),
						m('.row.p-top-44', [
							m('.component', [
								m(List, {
									header: {title: 'Validators', subtitle: `Records [${model.validators.length}]` },
									border: true,
									tiles: model.validators.map((validator) => createUserListTile(validator, model.chain))
								})
							])
						])
					)
				);
			}
	};

export default Validators;
