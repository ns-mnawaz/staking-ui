import m from 'mithril';
import Nav from '../Nav';
import { Button } from 'polythene-mithril';

const Staking: m.Component = {
	oncreate() {
		window.scrollTo(0, 0);
	},
	view: () => m('.council',
		m(Nav),
		m('.main.flex.auto',
				m('div.padding-10p',
				m('h1', 'Council'),
				m('p', 'Coming Soon'),
				m(Button, {
					label: 'Explore',
					element: m.route.Link,
					raised: true,
					url: { href: '/' }
				})
			)
		)
	)
};

export default Staking;
