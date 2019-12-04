import RestClient from "./restClient";
import urls from "../constants/urls";

export default class KeyOfTheDayApis {
  // constructor() {
  //
  // }
  
  static astronomyPictureOfTheDay(date) {
    this.restClient = new RestClient();
    const url = urls.APOD_URL.replace("{date}", date);
    return this.restClient.execute(url);
  }
}