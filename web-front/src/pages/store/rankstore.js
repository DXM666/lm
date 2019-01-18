import { action, observable, runInAction } from "mobx";

import { SiteConf } from "../../common/config";

export class RankStore {
  // ① 使用 observable decorator
  @observable books = [];
  @observable requestStatus = "pending";

  @action
  async getBookList(content) {
    this.requestStatus = "pending";
    let url;
    if (content.location.state && content.location.state.bookPath) {
      url = SiteConf.apiHost + "booklist/" + content.location.state.bookPath;
    } else {
      url = SiteConf.apiHost + "booklist/54d43437d47d13ff21cad58b";
    }
    const data = await fetch(url, {
      method: "get",
      mode: "cors"
    })
      .then(res => res.json())
      .then(res => res)
      .catch(e => console.log(e));
    runInAction(() => {
      this.books = data.ranking.books;
      this.requestStatus = "success";
    });
  }
}
