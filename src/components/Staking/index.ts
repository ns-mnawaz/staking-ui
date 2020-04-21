import m from 'mithril';
import Nav from '../Nav';

const Staking: m.Component = {
	view: () => m('.staking',
		m(Nav),
		m('.main',
				m('div.padding-10p',
				m('h1', 'Staking'),
				m('p', 'This is the about page. Stuff about the app.'),
				m('.test', 'This div tests flex styles and autoprefixer.')
			)
		)
	)
};

export default Staking;
