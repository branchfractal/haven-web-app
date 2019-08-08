import { TRANSFER_SUCCEED } from "../actions/types";

export const SUCCESS = "success";
export const ERROR = "error";

export const INCOMING_TRANSFER_MESSAGE = "incoming_transfer_message";

export const notificationList = [
  {
    key: TRANSFER_SUCCEED,
    code: 0,
    message: "Your transfer was successfully submitted...",
    type: SUCCESS
  },
  {
    key: INCOMING_TRANSFER_MESSAGE,
    code: 0,
    message: "Cha ching! You received a transfer...",
    type: SUCCESS
  },

  {
    key: "",
    code: -1,
    message: "Oops, that seed was incorrect",
    type: ERROR
    // Is this the vault login error?
  },
  {
    key: "",
    code: -2,
    message: "you are doing it wrong",
    type: ERROR
    // What is this error for?
  }
];