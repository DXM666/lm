import { HomePageStore } from "./homepagestore";
import { RankStore } from "./rankstore";

const homePageStore = new HomePageStore();
const rankStore = new RankStore();

export const store = { homePageStore, rankStore };
