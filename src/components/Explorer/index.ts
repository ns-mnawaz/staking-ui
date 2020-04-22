import m from 'mithril';
import Nav from '../Nav';
import { Tabs } from 'polythene-mithril';
import {Model} from '../../models/explorer';
import ChainInfo from './chainInfo';
import BlockDetails from './blockDetails';
import NodeInfo from './nodeInfo';
import {User} from '../../models/user';
import Loader from '../Common/loader';
import polkaDot from '../../models/polkadot';

const postView = ({ title, body }: {title: string, body: string}) => m('div', [
	m('h2', title),
	m('p', body)
]);

const Explorer = () => {
	const model = new Model(0);
	const user = new User(false);

	return {
		async oninit() {  await polkaDot.set('wss://kusama-rpc.polkadot.io/');
			await polkaDot.setValidatorCount();
			await polkaDot.setValidators();
			await user.LoadList();

		},
		view: () => {
			const tab = model.getCurrentTab();
			return m('.home',
				m(Nav),
				m('.main',

					m('div.padding-10p', [
						m(Tabs, {
							tabs: model.getTabs(),
							autofit: true,
							onChange: ({index}) => model.setTabIndex(index)
						}),
						m('.main-tab-content',
							[
								m('h3',
									tab.label
								),
								m('h3',
									`Validators ${polkaDot.validatorCount}`
								),
								m(Loader, {loading: user.loading}),

								user.error ? m('p', user.error) : user.list.map(postView),

								tab.id === 'chain_info' && m(ChainInfo),
								tab.id === 'block_details' && m(BlockDetails),
								tab.id === 'node_info' && m(NodeInfo),
							]
						)
					]),
					m('.layout.horizontal', [
						m('.flex.one'),
						m('.flex.three',
							m('input')
						),
						m('.flex.one')
					])
				)
			);
		}
	};
};


export default Explorer;
