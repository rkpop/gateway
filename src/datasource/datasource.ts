import { GatewayEvent } from "../models";

export interface DataSource {
  getAvailableEvents(): Promise<GatewayEvent[]>;
}
