import { action } from "mobx";

export class HomePageAction {
  constructor(store) {
    this.store = store;
  }
  @action
  test = (index) => {
    this.store.a = 6;
  };
}
