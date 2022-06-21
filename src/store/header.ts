import { makeAutoObservable } from "mobx";
import type { ButtonInterface, HeaderInterface } from "./../composables/interfaces";

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

  set(headerData: HeaderInterface) {
    this.title = headerData.title;
    this.button = headerData.button;
  }
}

const headerStore = new HeaderStore();
export default headerStore;
