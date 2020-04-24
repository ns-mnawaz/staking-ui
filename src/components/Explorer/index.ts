import m from 'mithril';
import Nav from '../Nav';
import { Tabs } from 'polythene-mithril';
import {Model} from '../../models/explorer';
import ChainInfo from './chainInfo';
import BlockDetails from './blockDetails';
import NodeInfo from './nodeInfo';
import {User} from '../../models/user';
import Loader from '../Common/loader';

const Explorer = () => {
	const model = new Model(0);
	const user = new User(false);

	return {
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
								m(Loader, {loading: user.loading}),

							// 	user.error ? m('p', user.error) : user.list.map(postView),

								tab.id === 'chain_info' && m(ChainInfo),
								tab.id === 'block_details' && m(BlockDetails),
								tab.id === 'node_info' && m(NodeInfo),
							]
						)
					])
				)
			);
		}
	};
};


export default Explorer;
