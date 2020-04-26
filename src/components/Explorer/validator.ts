import m from 'mithril';
import { ListTile, List } from 'polythene-mithril'
import Loader from '../Common/loader';
import Nav from '../Nav';
import polkaDot from '../../models/polkadot';
import icons from '../Common/icons';
import {get} from 'lodash';
import moment from 'moment';

const createUserListTile = (title: string, subtitle: string) =>
	m(ListTile, {
		title,
		subtitle,
		front: icons.Barcode
	});

const model = {
	validator: '',
	loading: true,
	details: {
		index: '',
		block: '',
		heartbeat: ''
	},
	identity: {},
	nominators: []
};

function formatHeartbeat(milliseconds: number) {
	const duration = moment.duration(milliseconds, 'milliseconds');
	const hours = Math.floor(duration.asHours());
	const mins = Math.floor(duration.asMinutes()) - hours * 60;
	return `Hours: ${hours} Minutes: ${mins}`;
}

async function apiCall() {

	const [identity, details, nominators] = await Promise.all([
		polkaDot.identity(model.validator),
		polkaDot.iamOnline(model.validator),
		polkaDot.nominators(model.validator)
	]);

	const nominatorList = nominators || [];

	details.heartbeat = formatHeartbeat(details.heartbeat);

	model.identity = identity;
	model.nominators = nominatorList;
	model.details = details;

}

const ChainInfo: m.Component =  {

		async oncreate() {

			model.validator = m.route.param('id');
		 	await polkaDot.set();
			await apiCall();

			model.loading = false;
			m.redraw();
			window.scrollTo(0, 0);

		},
		view: () => {
				return m('.home',
					m(Nav),
					m('.main',
						m('div.padding-10p',
							m('.row.p-top-24',
							model.loading ? m(Loader, {loading: model.loading}) : m('div',
									m('.layout.horizontal', [
										m('.flex.one',
											m(ListTile, {
												title: 'Validator',
												subtitle: model.validator
											})
										)
									]),
								m('.layout.horizontal.p-top-24', [
									m('.flex.one',
										m(ListTile, {
											title: 'Identity'
										})
									)
								]),
								m('.layout.horizontal', [
									m('.flex.one.p-3',
										m(ListTile, {
											title: 'Deposits',
											subtitle: get(model, 'identity.deposit', '0 KSM')
										})
									),
									m('.flex.one.p-3',
										m(ListTile, {
											title: 'Email',
											subtitle: get(model, 'identity.info.email.Raw', 'N/A')
										})
									),
									m('.flex.one.p-3',
										m(ListTile, {
											title: 'Display',
											subtitle: get(model, 'identity.info.display.Raw', 'N/A')
										})
									),
									m('.flex.one.p-3',
										m(ListTile, {
											title: 'Legal',
											subtitle: get(model, 'identity.info.legal.Raw', 'N/A')
										})
									)
								]),
								m('.layout.horizontal.p-top-24', [
									m('.flex.one',
										m(ListTile, {
											title: 'I am Online'
										})
									)
								]),
								m('.layout.horizontal', [
									m('.flex.one.p-3',
										m(ListTile, {
											title: 'Session Index',
											subtitle: get(model, 'details.index', 'N/A')
										})
									),
									m('.flex.one.p-3',
										m(ListTile, {
											title: 'Authored Blocks',
											subtitle: get(model, 'details.block', 'N/A')
										})
									),
									m('.flex.one.p-3',
										m(ListTile, {
											title: 'Heartbeat After ',
											subtitle: get(model, 'details.heartbeat', 'N/A')
										})
									)
								]),
								m('.row.p-top-44', [
									m('.component', [
										m(List, {
											header: {title: 'Nominators', subtitle: `Records [${model.nominators.length}]` },
											border: true,
											tiles: model.nominators.map((nominator) => createUserListTile(nominator, model.validator))
										})
									])
								])
							))
						)
					)
				)
			}
	};

export default ChainInfo;
