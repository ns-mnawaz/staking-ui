import m from 'mithril';
import Nav from '../Nav';

const Staking: m.Component = {
	view: () => m('.council',
		m(Nav),
		m('.main.flex.auto',
				m('div.padding-10p',
				m('.flex.one', 'Vertical content 12313'),
				m('.flex.ten', 'Vertical content 12313'),
				m('.layout.vertical', 'Vertical content 12313'),
				m('h1', 'Council'),
				m('p', 'This is the about page. Stuff about the app.'),
				m('.test', 'This div tests flex styles and autoprefixer.')
			)
		)
	)
};

export default Staking;
