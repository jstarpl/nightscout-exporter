import { IConverter } from "./Converter";

const SEPARATOR = ",";

export class CSVConverter implements IConverter {
    private _columns: string[];
    private _data: object[];

    constructor(columns: string[], data: object[]) {
        this._columns = columns;
        this._data = data;
    }

    public get extension(): string {
        return "csv";
    }

    public convert(): Blob {
        // MS Excel needs to be hinted at the used separator, since it uses a separator from
        // the system Regional settings
        let result = "SEP=" + SEPARATOR + "\r\n";
        result += this._columns.map((val) => "\"" + val + "\"").join(SEPARATOR) + "\r\n";
        result += this._data.map((row) => {
            return this._columns.map((property) => "\"" + row[property] + "\"").join(SEPARATOR);
        }).join("\r\n");
        result += "\r\n";

        return new Blob([ result ], { type: "text/csv" });
    }
}