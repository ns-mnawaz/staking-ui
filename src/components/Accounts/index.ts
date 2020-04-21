import m from 'mithril';
import Nav from '../Nav';
import { Button } from 'polythene-mithril';

const Staking: m.Component = {
	view: () => m('.accounts',
		m(Nav),
		m('.main',
			m('div.padding-10p',
				m('h1', 'Accounts'),
				m('p', 'This is the about page. Stuff about the app.'),
				m('.test', 'This div tests flex styles and autoprefixer.'),
				m(Button, {
					label: 'Staking',
					element: m.route.Link,
					style: {
						backgroundColor: '#ff9800',
						color: '#000'
					},
					raised: true,
					url: {
						href: '/staking',
					}
				})
			)
		)
	)
};

export default Staking;
