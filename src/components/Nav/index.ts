import m from 'mithril';
import 'polythene-css';

import { Toolbar, ToolbarTitle, IconButton, Icon } from 'polythene-mithril';
import { ToolbarCSS } from 'polythene-css';

ToolbarCSS.addStyle('.themed-toolbar', {
	color_light_background: '#00c853',
	color_dark_background:  '#00c853'
});

const iconMenuSVG = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
const logoSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512px" height="512px" viewBox="0 0 512 512" version="1.1" style="zoom: 1;"><!-- Generator: Sketch 57.1 (83088) - https://sketch.com --><title>logo-white-with-bg</title><desc>Created with Sketch.</desc><g id="logo-white-with-bg" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect fill="#111111" x="0" y="0" width="512" height="512" visibility="hidden"></rect><circle stroke="#000000" id="circle1" stroke-width="3px" cy="256px" fill="#111111" r="250px" cx="256px" transform=""></circle><path d="M160.5,199.5 L160.5,319.5" id="Line" stroke="#FFFFFF" stroke-width="22" stroke-linecap="square"></path><path d="M160.5,199.5 L160.5,319.5" id="Line" stroke="#FFFFFF" stroke-width="22" stroke-linecap="square" transform="translate(160.500000, 259.500000) rotate(60.000000) translate(-160.500000, -259.500000)"></path><path d="M160.5,199.5 L160.5,319.5" id="Line" stroke="#FFFFFF" stroke-width="22" stroke-linecap="square" transform="translate(160.500000, 259.500000) rotate(-60.000000) translate(-160.500000, -259.500000)"></path><path d="M348.5,206.5 L348.5,256.5" id="Line" stroke="#FFFFFF" stroke-width="22" stroke-linecap="square" transform="translate(348.500000, 231.500000) scale(1, -1) translate(-348.500000, -231.500000)"></path><path d="M385.739092,271 L385.739092,321" id="Line" stroke="#FFFFFF" stroke-width="22" stroke-linecap="square" transform="translate(385.739092, 296.000000) scale(-1, 1) rotate(60.000000) translate(-385.739092, -296.000000)"></path><path d="M311.260908,271 L311.260908,321" id="Line" stroke="#FFFFFF" stroke-width="22" stroke-linecap="square" transform="translate(311.260908, 296.000000) scale(-1, 1) rotate(-60.000000) translate(-311.260908, -296.000000)"></path></g></svg>';

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
						toolbarButton({svg: m.trust(logoSVG), href: '/', label: ''}),
						m(ToolbarTitle, { text: 'Staking UI' }),
						toolbarButton({svg: null, href: '/', label: 'Explorer'}),
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
