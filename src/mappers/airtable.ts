import { GatewayEvent } from "../models";
import moment from "moment";

export const AirtableRowToGatewayEvent = (row: any): GatewayEvent => {
  return {
    startDate: moment(row.get("Start Date")).toDate(),
    endDate: moment(row.get("End Date")).toDate(),
    name: row.get("Name"),
    description: row.get("Description"),
    accountAge: moment(row.get("Start Date")).subtract(
      ...row.get("Minimum age").split(" "),
    ),
  };
};
