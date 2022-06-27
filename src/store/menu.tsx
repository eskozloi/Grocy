import { makeAutoObservable } from "mobx";

export interface TabInterface {
  title: string;
  href: string;
  ico: string;
  order: number;
}

class MenuStore {
  isActive = false;
  tabs: TabInterface[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  reset() {
    this.isActive = false;
    this.tabs = [];
  }

  set(newTabs: TabInterface[]) {
    this.tabs = newTabs;
  }

  push(newTab: TabInterface) {
    this.tabs.push(newTab);
  }

  getOrdered() {
    return this.tabs.sort((a, b) => a.order - b.order);
  }

  show() {
    this.isActive = true;
  }

  hide() {
    this.isActive = false;
  }

  toggle() {
    this.isActive = !this.isActive;
  }
}

const menuStore = new MenuStore();
export default menuStore;
