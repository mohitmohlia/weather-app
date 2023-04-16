import moment from "moment-timezone";

export const convertUnixToDate = (unix: number) => {
  return moment.unix(unix).tz("America/Los_Angeles").format("hh:mm A");
};
