import { makeAutoObservable } from "mobx";
import type { ButtonInterface } from "./../composables/interfaces";

class HeaderStore {
  title?: string = undefined;
  button?: ButtonInterface = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  reset() {
    this.title = undefined;
    this.button = undefined;
  }

  setTitle(newTitle?: string) {
    this.title = newTitle;
  }

  setButton(newButton?: ButtonInterface) {
    this.button = newButton;
  }
}

const headerStore = new HeaderStore();
export default headerStore;
