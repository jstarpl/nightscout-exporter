import { CSVConverter } from "./CSVConverter";
import { JSONConverter } from "./JSONConverter";
import { XLSXConverter } from "./XLSXConverter";
import { IOptions } from "../components/App";

export enum ExportFormats {
    XLSX = "xlsx",
    CSV = "csv",
    JSON = "json",
}

export interface IConverter {
    extension: string;
    convert(): Blob;
}

export function converterFactory(mode: ExportFormats, columns: string[], data: object[], options: IOptions) {
    switch (mode) {
        case ExportFormats.XLSX:
            return new XLSXConverter(columns, data, options);
        case ExportFormats.CSV:
            return new CSVConverter(columns, data, options);
        case ExportFormats.JSON:
            return new JSONConverter(columns, data, options);
    }
    throw new Error("Unknown conversion format");
}
