import m from 'mithril';
import {IconButton} from 'polythene-mithril';
import icons from './icons';

class Button {
	readonly search = {
		view: ({ attrs }: {attrs: any}) =>
			m(IconButton, {
				icon: { svg: icons.search },
				ink: false,
				events: { onclick: attrs.search }
			})
	};
	readonly clear = {
		view: ({ attrs }: {attrs: any}) =>
			m(IconButton, {
				icon: { svg: icons.clear },
				ink: false,
				events: { onclick: attrs.clear }
			})
	};
}

export = new Button();
