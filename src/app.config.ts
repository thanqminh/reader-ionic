import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app");

export interface IAppConfig {
  apiEndpoint: string;
  defaultTextSize: number;
  maxTextSize: number;
  textSizeDifference: number;
}

export const AppConfig: IAppConfig = {
  //apiEndpoint: "http://reader.thanqminh.com/api"
  apiEndpoint: "assets/data",
  defaultTextSize: 20,
  maxTextSize: 100,
  textSizeDifference: 5
};
