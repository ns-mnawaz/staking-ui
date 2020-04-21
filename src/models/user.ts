import m from 'mithril';
import {Item} from './item';

const api = {
	path: 'https://jsonplaceholder.typicode.com',
	getPosts(): any {
		return m.request({ url: `${api.path}/posts` });
	}
};

export class User {
	list: Item[];
	loading: boolean;
	error: string;

	constructor (loading: boolean) {
		this.loading = loading;
		this.list = [];
		this.error = '';
	}

	async LoadList(): Promise<Item[]> {
		this.loading = true;

		try {
			const response =  await api.getPosts();
			this.list = response.map((listItem: Item) => new Item(listItem));
			return this.list;
		} catch (error) {
			this.error = error.message || 'Network Error';
			return [];
		} finally {
			this.loading = false;
		}
	}
}

