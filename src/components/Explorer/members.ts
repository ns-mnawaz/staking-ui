import m from 'mithril';
import { ListTile, List } from 'polythene-mithril'
import icons from '../Common/icons';
import polkaDot from '../../models/polkadot';
import Loader from '../Common/loader';

const model = {
	loading: true,
	members: [],
	founder: '',
	head: '',
	maxMembers: ''
};

async function apiCall() {

	const [founder, head, members, maxMembers] = await Promise.all([
		polkaDot.founder(),
		polkaDot.head(),
		polkaDot.members(),
		polkaDot.maxMembers(),
	]);

	const memberList = members || [];

	model.founder = founder;
	model.head = head;
	model.members = memberList;
	model.maxMembers = maxMembers;
}

const createUserListTile = (title: string) =>
	m(ListTile, {
		title,
		subtitle : 'Member Address',
		front: icons.Barcode
	});

const Members: m.Component = {
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
							subtitle: model.founder,
							title: 'Founder Address'
						})
					),
					m('.flex.one.p-3',
						m(ListTile, {
							subtitle: model.head,
							title: 'Head Address'
						})
					),
					m('.flex.one.p-3',
						m(ListTile, {
							subtitle: model.maxMembers,
							title: 'Max Members'
						})
					)
				]),
				m('.row.p-top-44', [
					m('.component', [
						m(List, {
							header: {title: 'Members', subtitle: `Records [${model.members.length}]`},
							border: true,
							tiles: model.members.map((member) => createUserListTile(member))
						})
					])
				])
			)
		);
	}
};

export default Members;
