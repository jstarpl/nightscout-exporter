import { IConverter } from "./Converter";
import { IOptions } from "../components/App";

export class CSVConverter implements IConverter {
    private columns: string[];
    private data: object[];
    private _separator: string = ",";

    constructor(columns: string[], data: object[], options: IOptions) {
        this.columns = columns;
        this.data = data;
        if (options.semicolonSeparated) {
            this._separator = ";";
        }
    }

    public set separator(val: string) {
        this._separator = val;
    }

    public get separator(): string {
        return this._separator;
    }

    public get extension(): string {
        return "csv";
    }

    public convert(): Blob {
        // MS Excel needs to be hinted at the used separator, since it uses a separator from
        // the system Regional settings
        let result = "SEP=" + this._separator + "\r\n";
        result += this.columns.map((val) => "\"" + val + "\"").join(this._separator) + "\r\n";
        result += this.data.map((row) => {
            return this.columns.map((property) => "\"" + row[property] + "\"").join(this._separator);
        }).join("\r\n");
        result += "\r\n";

        return new Blob([ result ], { type: "text/csv" });
    }
}
