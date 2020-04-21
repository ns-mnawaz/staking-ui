import Explorer from '../constants/explorer';
import {Tab} from './tab';

export class Model {

	selectedIndex: number;
	readonly tabs: Tab[];

	constructor (index: number) {
		this.selectedIndex = index;
		this.tabs = Explorer.mainButtons;
	}

	setTabIndex(index: number) {
		this.selectedIndex = index;
	}

	getCurrentTab(): Tab {  return this.tabs[this.selectedIndex]; }

	getTabs(): Tab[] {  return this.tabs; }
}
