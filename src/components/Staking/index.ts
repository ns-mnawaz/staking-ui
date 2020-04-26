import m from 'mithril';
import Nav from '../Nav';
import { Button } from 'polythene-mithril';

const Staking: m.Component = {
	oncreate() {
		window.scrollTo(0, 0);
	},
	view: () => m('.staking',
		m(Nav),
		m('.main',
				m('div.padding-10p',
				m('h1', 'Staking'),
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
