import { IConverter } from "./Converter";
import { IOptions } from "../components/App";

export class JSONConverter implements IConverter {
    private columns: string[];
    private data: object[];

    constructor(columns: string[], data: object[], options: IOptions) {
        this.columns = columns;
        this.data = data;
    }

    public get extension(): string {
        return "json";
    }

    public convert(): Blob {
        const data = JSON.stringify(this.data);

        return new Blob([ data ], { type: "application/json" });
    }
}
