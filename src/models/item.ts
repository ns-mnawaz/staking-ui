export class Item {
	userId: number;
	id: number;
	title: string;
	body: string;
	constructor (post: Item) {
		this.userId = post.userId;
		this.id = post.id;
		this.title = post.title;
		this.body = post.body;
	}
}
