import m from 'mithril';
import Nav from '../Nav';
import { Tabs } from 'polythene-mithril';
import {Model} from '../../models/explorer';
import ChainInfo from './chainInfo';
import BlockDetails from './blockDetails';
import NodeInfo from './nodeInfo';

const model = new Model(0);

const Explorer: m.Component = {
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


export default Explorer;
