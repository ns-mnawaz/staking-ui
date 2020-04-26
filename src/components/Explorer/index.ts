import m from 'mithril';
import Nav from '../Nav';
import { Tabs } from 'polythene-mithril';
import {Model} from '../../models/explorer';
import Validators from './validators';
import Eras from './eras';
import Members from './members';

const model = new Model(0);

const Explorer: m.Component = {
		oncreate() {
			window.scrollTo(0, 0);
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
								tab.id === 'validators_info' && m(Validators),
								tab.id === 'eras_info' && m(Eras),
								tab.id === 'members_info' && m(Members),
							]
						)
					])
				)
			);
		}
	};


export default Explorer;
