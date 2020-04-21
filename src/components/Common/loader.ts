import m from 'mithril';
import { IOSSpinner as Spinner } from 'polythene-mithril';

const Loader = {
	view: ({attrs}: {attrs: any}) => {
		return m(Spinner, { className: 'div-center',
			style: { display: 'flex', alignItems: 'center'},
			shadowDepth: 1, raised: true, size: 'fab', show: attrs.loading })
	}
};

export default Loader;
