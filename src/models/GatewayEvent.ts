import { Moment } from "moment";

export interface GatewayEvent {
  startDate: Date;
  endDate: Date;
  name: string;
  description: string;
  accountAge: Moment;
}
