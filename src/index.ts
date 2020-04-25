// App entry point
import m from 'mithril';
import Explorer from './components/Explorer';
import Validator from './components/Explorer/validator';
import Staking from './components/Staking';
import Accounts from './components/Accounts';
import Council from './components/Council';

m.route(document.body, '/', {
	'/': Explorer,
	'/staking': Staking,
	'/accounts': Accounts,
	'/council': Council,
	'/validator/:id': Validator
});

///////////////////////////////////////////////////////////
// For browserify-hmr
// See browserify-hmr module.hot API docs for hooks docs.
declare const module: any; // tslint:disable-line no-reserved-keywords
if (module.hot) {
	module.hot.accept();
	// module.hot.dispose((data: any) => {
	// 	m.redraw();
	// })
}
///////////////////////////////////////////////////////////
