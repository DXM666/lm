import { observable } from "mobx";

// 定义数据结构
export class Store {
  // ① 使用 observable decorator
  @observable a = 0;
}
