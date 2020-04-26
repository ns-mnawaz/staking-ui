import m from 'mithril';
import 'polythene-css';

import { Toolbar, ToolbarTitle, IconButton } from 'polythene-mithril';
import Icons from '../Common/icons';

const toolbarButton = ({svg, href, label}: {svg: any, href: string, label: string}) => {
	const options = {
		label,
		icon: { svg },
		element: m.route.Link,
		url: {href}
	};
	if (!svg) {
		delete options.icon;
	}
	return m(IconButton, options);
};

const Nav = {
	view: () => [
		m('.row.pe-dark-tone', [
			m('.component.fixed-top',
				m(Toolbar,
					[
						toolbarButton({svg: Icons.logo, href: '/', label: ''}),
						m(ToolbarTitle, { text: 'Staking UI' }),
						toolbarButton({svg: Icons.Braille, href: '/', label: 'Explorer'}),
						toolbarButton({svg: null, href: '/staking', label: 'Staking'}),
						toolbarButton({svg: null, href: '/accounts', label: 'Accounts'}),
						toolbarButton({svg: null, href: '/council', label: 'Council'})
					]
				)
			)
		]),
	]
};

export default Nav;
