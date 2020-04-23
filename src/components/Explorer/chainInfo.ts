import m from 'mithril';
import { ListTile, List } from 'polythene-mithril'
import { Search, Shadow, IconButton } from 'polythene-mithril';
import polkaDot from '../../models/polkadot';
import icons from '../Common/icons';
import Loader from "../Common/loader";

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

	const state = {
		value: '',
		clear: () => state.value = "",
		search: (element: any) => {
			// search
			console.log('integrate search api', element);
		}
	};

	return {
		async oninit() {
			 await polkaDot.set();
		},
		async oncreate() {
		  await Promise.all([
        polkaDot.setValidatorCount(),
        polkaDot.setValidators(),
        polkaDot.setChain(),
        polkaDot.lastBlock()
      ]);
		},
		view: ({ attrs }: {attrs: any}) => {
			return m('.row.p-top-24',
				m('h1', polkaDot.loading),
				m('.layout.horizontal', [
					m('.flex.one',
						m(ListTile, {
							title: polkaDot.validatorCount,
							subtitle: 'Validators',
							highSubtitle: `#${polkaDot.lastBlockNo}`
						})
					),
					m('.flex.four',
						m(Search, Object.assign({}, { className: 'margin-12',
							textfield: {
								label: 'Search',
								onChange: ({ value }: {value: string}) =>  ( state.value = value ),
								value: state.value
							},
							before: m(Shadow),
							fullWidth: true,
							buttons: {
								focus_dirty: {
									before: m(ClearButton, { clear: state.clear }),
									after: m(SearchIcon, { search: state.search })
								},
								dirty: {
									before: m(ClearButton, { clear: state.clear }),
									after: m(SearchIcon, { search: state.search })
								}
							},
							attrs
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
				m(".row.p-top-24", [
					m(Loader, {loading: polkaDot.loading}),
					m(".component", [
						m(List, {
							header: { title: "Validators" },
							border: true,
							tiles: polkaDot.validators.map((validName) => createUserListTile(validName, polkaDot.chainName))
						})
					])
				])
			);
		}
	};
};

export default ChainInfo;
