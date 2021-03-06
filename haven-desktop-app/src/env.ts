import { app } from "electron";
import * as path from "path";
import { NET, NetTypeName } from "./types";

export const APP_DATA_PATH = app ? app.getPath("userData") : path.join(__dirname, "../__tests__/");
export const isDevMode = process.env.HAVEN_DESKTOP_DEVELOPMENT;

let NET_TYPE_ID: NET = parseInt(process.env.NET_TYPE_ID, 10);

export const isMainnet = () => NET_TYPE_ID === NET.Mainnet;
export const isStagenet = () => NET_TYPE_ID === NET.Stagenet;
export const isTestnet = () => NET_TYPE_ID === NET.Testnet;

export const getNetTypeId = (): NET => {
  return NET_TYPE_ID;
};



export const getNetTypeName = (): NetTypeName => {

  return [NetTypeName.mainnet, NetTypeName.testnet, NetTypeName.stagenet][getNetTypeId()];

};

export const setNetType = (netType: NET) => {
  if (netType in NET) {
    NET_TYPE_ID = netType;
  }
};
