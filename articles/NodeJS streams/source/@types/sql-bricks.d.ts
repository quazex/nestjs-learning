/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { SelectStatement } from 'sql-bricks';

declare module 'sql-bricks' {
    interface InsertStatement extends Statement {
        into(tbl: TableName, ...columns: any[]): InsertStatement;
        intoTable(tbl: TableName, ...columns: any[]): InsertStatement;
        select(...columns: Array<string | SelectStatement>): SelectStatement;
        select(columns: string[] | SelectStatement[]): SelectStatement;
        values(...values: any[]): InsertStatement;
    }
}
