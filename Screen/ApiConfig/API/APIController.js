import API from "./API";
import URLs from "./URLs";

export const doLogin = (Data) => { return API.shared.AxiosApi(URLs.LOGIN, Data) }
