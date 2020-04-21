export class Tab {
	[index: number]: boolean;
	id: string;
	label: string;

	constructor (id: string, label: string) {
		this.id = id;
		this.label = label;
	}
}
