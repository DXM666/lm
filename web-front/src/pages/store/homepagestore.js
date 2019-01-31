import { action, observable } from "mobx";

import { SiteConf } from "../../common/config";

export class HomePageStore {
  // ① 使用 observable decorator
  @observable homePageData = observable.array();
  @observable requestStatus = "pending";

  @action
  getBookDetailContent() {
    const headers = new Headers({
      Authorization: "bearer " + sessionStorage.getItem("token"),
      "Content-Type": "text/plain"
    });
    this.requestStatus = "pending";
    const url = SiteConf.apiHost + "bookdetail";
    return fetch(url, {
      method: "GET",
      mode: "cors",
      headers: headers
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.homePageData = res;
        this.requestStatus = "success";
        // this.props.history.push({
        //   pathname: "/bookdetail",
        //   state: { content: res, num: index }
        // });
      });
  }
}
