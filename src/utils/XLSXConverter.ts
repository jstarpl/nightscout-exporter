import { IConverter } from "./Converter";
import * as xlsx from "xlsx";
import { IOptions } from "../components/App";

export class XLSXConverter implements IConverter {
    private columns: string[];
    private data: object[];

    constructor(columns: string[], data: object[], options: IOptions) {
        this.columns = columns;
        this.data = data;
    }

    public get extension(): string {
        return "xlsx";
    }

    public convert(): Blob {
        const data: string[][] = [
            this.columns,
            ...this.data.map((row) => this.columns.map((prop) => row[prop])),
        ];
        const sheet = xlsx.utils.aoa_to_sheet(data);

        // Convert to native data types
        const dateIdx = this.columns.indexOf("date");
        if (dateIdx >= 0) {
            const column = xlsx.utils.encode_col(dateIdx);
            let i = 2;
            while (sheet[column + i]) {
                sheet[column + i].v = new Date(sheet[column + i].v);
                sheet[column + i].t = "d";
                i++;
            }
        }

        const wb: xlsx.WorkBook = {
            SheetNames: [
                "Data",
            ],
            Sheets: {
                Data: sheet,
            },
        };
        return new Blob([ xlsx.write(wb, {
            bookSST: false,
            bookType: "xlsx",
            type: "array",
        }) ], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
    }
}
