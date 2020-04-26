import m from 'mithril';
import { ListTile, List } from 'polythene-mithril'
import icons from '../Common/icons';
import polkaDot from '../../models/polkadot';
import moment from 'moment';
import Loader from '../Common/loader';

const model = {
	loading: true,
	bondedEras: [],
	version: '',
	era: {
		index: 0,
		start: ''
	},
	cancelPayout: '',
	unapplySlash: '',
	depth: '',
	count: ''
};


async function apiCall() {

	const [version, era, cancelPayout, unapplySlash, depth, count, bondedEras] = await Promise.all([
		polkaDot.version(),
		polkaDot.activeEra(),
		polkaDot.cancelPayout(),
		polkaDot.unapplySlash(),
		polkaDot.historyDepth(),
		polkaDot.minValidatorCount(),
		polkaDot.bondedEras()
	]);

	const bondedEraList = bondedEras || [];

	model.version = version;
	model.era.index = era.index;
	model.era.start = moment(era.index.start).format('lll');
	model.cancelPayout = cancelPayout;
	model.unapplySlash = unapplySlash;
	model.depth = depth;
	model.count = count;
	model.bondedEras = bondedEraList;

}

const createUserListTile = (item: any) =>
	m(ListTile, {
		title : item[0],
		subtitle : item[1],
		front: icons.Qrcode
	});

const Eras: m.Component = {
	async oncreate() {

		await polkaDot.set();
		await apiCall();

		model.loading = false;
		m.redraw();

	},
	view: () => {
		return  m('.row.p-top-24',
			model.loading ? m(Loader, {loading: model.loading}) : m('div',
				m('.layout.horizontal', [
					m('.flex.one.p-3',
						m(ListTile, {
							subtitle: model.version,
							title: 'Pallet Storage Version'
						})
					),
					m('.flex.one.p-3',
						m(ListTile, {
							subtitle: '' + model.era.index,
							title: 'Active Era Index'
						})
					),
					m('.flex.one.p-3',
						m(ListTile, {
							subtitle: model.era.start,
							title: 'Active Era Start'
						})
					),
					m('.flex.one.p-3',
						m(ListTile, {
							subtitle: model.cancelPayout,
							title: 'Cancel Amount'
						})
					)
				]),
				m('.layout.horizontal', [
					m('.flex.one.p-3',
						m(ListTile, {
							subtitle: model.unapplySlash,
							title: 'Unapply Slash Era '
						})
					),
					m('.flex.one.p-3',
						m(ListTile, {
							subtitle: model.depth,
							title: 'History Eras'
						})
					),
					m('.flex.one.p-3',
						m(ListTile, {
							subtitle: model.count,
							title: 'Minimum Validators'
						})
					)
				]),
				m('.row.p-top-44', [
					m('.component', [
						m(List, {
							header: {title: 'Bonded Eras', subtitle: `Records [${model.bondedEras.length}]`},
							border: true,
							tiles: model.bondedEras.map((validator) => createUserListTile(validator))
						})
					])
				])
			)
		);
	}
};

export default Eras;
