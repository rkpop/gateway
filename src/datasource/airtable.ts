import Airtable from "airtable";
import { DataSource } from "./datasource";
import { GatewayEvent } from "../models";
import { AirtableRowToGatewayEvent } from "../mappers";

class AirtableSource implements DataSource {
  private base: any;
  private table: any;

  public constructor() {
    this.base = new Airtable().base(process.env.AIRTABLE_BASE);
    this.table = this.base(process.env.POLLS_TABLE);
  }

  public getAvailableEvents(): Promise<GatewayEvent[]> {
    return this.table
      .select({
        filterByFormula: this.generateAirtableFormula(),
      })
      .all()
      .then((entries: unknown[]) => {
        return entries.map((entry: unknown) =>
          AirtableRowToGatewayEvent(entry),
        );
      });
  }

  private generateAirtableFormula(): string {
    return "IS_BEFORE({End Date}, TODAY())";
  }
}

export interface Events {
  "Start Date": string;
  "End Date": string;
  "Minimum age": string;
  Description: string;
  Name: string;
}
