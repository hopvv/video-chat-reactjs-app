import axios from "axios";
import config from "../../configs/config";

import urls from "../constants/urls";
import * as Methods from "../constants/methods";

export default class RestClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl ? baseUrl : urls.BASE_URL;
    this.apiKey = apiKey ? apiKey : config["api-key-nasa"];
    this.headers = {
      'Content-Type': 'application/json'
    };
  }
  
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }
  
  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }
  
  logError(error) {
    console.error("Error:", error);
    throw error;
  }
  
  execute(pathUrl, method = Methods.GET, param, isAuthenUrl = false) {
    if (!pathUrl) return;
    if (!isAuthenUrl) {
      // const commatest = pathUrl.include('?') ? "&" : "?";
      pathUrl += `${pathUrl.includes('?') ? "&" : "?"}api_key=${this.apiKey}`;
    }
    switch (method) {
      case Methods.GET: {
        return axios.get(`${this.baseUrl}/${pathUrl}`).then(res => {
          return res;
        })
          .catch(e => {
            this.logError(e);
          })
          .finally(() => {
            // always executed
          })
      }
      default: {
        return;
      }
    }
  }
}