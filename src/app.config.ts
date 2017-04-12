import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app");

export interface IAppConfig {
  apiEndpoint: string;
}

export const AppConfig: IAppConfig = {
  //apiEndpoint: "http://reader.thanqminh.com/api"
  apiEndpoint: "assets/data"
};
