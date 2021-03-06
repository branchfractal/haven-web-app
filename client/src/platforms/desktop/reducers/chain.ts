import {
  GET_BLOCK_INFO_SUCEED,
  GET_WALLET_HEIGHT_SUCCEED,
  RESCAN_FAILED,
  RESCAN_SUCCEED,
  START_RESCAN,
} from "../actions/types";
import {AnyAction} from "redux";
import {SyncState, ThreeState} from "shared/types/types";
import {DesktopAppState} from "platforms/desktop/reducers/index";
import {selectisLocalNode} from "platforms/desktop/reducers/havenNode";

interface Chain {
  walletHeight: number;
  nodeHeight: number;
  chainHeight: number;
  isRefreshing: boolean;
}

const INITIAL_STATE: Chain = {
  walletHeight: 0,
  chainHeight: 0,
  nodeHeight: 0,
  isRefreshing: false,
};

export const chain = (state = INITIAL_STATE, action: AnyAction): Chain => {
  switch (action.type) {
    case GET_BLOCK_INFO_SUCEED:
    case GET_WALLET_HEIGHT_SUCCEED:
      return { ...state, ...action.payload };
    case START_RESCAN:
      return { ...state, isRefreshing: true };
    case RESCAN_FAILED:
    case RESCAN_SUCCEED:
      return { ...state, isRefreshing: false };
    default:
      return state;
  }
};

export const selectBlockHeight = (state: DesktopAppState) => {
  return state.chain.chainHeight;
};

export const selectNodeHeight = (state: DesktopAppState) => {
  return state.chain.nodeHeight;
};

export const selectDesktopSyncState = (state: DesktopAppState): SyncState => {


  // if wallet is not connected at all, we are not syncing
  const isWalletConnected = state.walletRPC.isConnectedToDaemon === ThreeState.True;




  const isLocalNode = selectisLocalNode(state.havenNode);
  const blockHeight = state.chain.chainHeight;
  let scannedHeight: number;
  let isSyncing: boolean;


  //we must distinguish between multiple cases
  // 1. local syncing node -> show progress of node
  //when we use a local node syncing of wallet itself is super fast, so just show the sync state of the node
  if (isLocalNode) {
    isSyncing = state.chain.chainHeight > state.chain.nodeHeight + 3;
    scannedHeight = state.chain.nodeHeight;
  }
  // when we use a remote node take the sync height from wallet
  else {
    isSyncing = state.chain.chainHeight > state.chain.walletHeight + 3;
    scannedHeight = state.chain.walletHeight;
  }

  if (!isWalletConnected) {
    return {isSyncing:false, blockHeight, scannedHeight};
  }




  return { isSyncing, blockHeight, scannedHeight };
};

export const selectWalletHeight = (state: DesktopAppState) => {
  return state.chain.walletHeight;
};

export const selectRefreshing = (state: DesktopAppState) => {
  return state.chain.isRefreshing;
};

export const isWalletSynced = (state: DesktopAppState): boolean => {
  if (state.chain.walletHeight === 0) {
    return false;
  }

  // give it a little tolerance, if we are almost synced we just ignore that
  return state.chain.walletHeight >= state.chain.nodeHeight - 5;
};
