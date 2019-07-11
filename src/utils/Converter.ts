import { CSVConverter } from "./CSVConverter";
import { XLSXConverter } from "./XLSXConverter";

export enum ExportFormats {
    XLSX = "xlsx",
    CSV = "csv",
}

export interface IConverter {
    extension: string;
    convert(): Blob;
}

export function converterFactory(mode: ExportFormats, columns: string[], data: object[]) {
    switch (mode) {
        case ExportFormats.XLSX:
            return new XLSXConverter(columns, data);
        case ExportFormats.CSV:
            return new CSVConverter(columns, data);
    }
    throw new Error("Unknown conversion format");
}
