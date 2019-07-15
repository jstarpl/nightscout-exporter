enum DATA_FIELDS {
    "sgv" = "sgv",
}

function roundDecimal(input: number, digits: number) {
    return Math.round(input * Math.pow(10, digits)) / Math.pow(10, digits);
}

export function processData(ingestedData: object[]): object[] {
    return ingestedData.map((i) => {
        return Object.assign({}, i,
            i[DATA_FIELDS.sgv] !== undefined ? {
                "BG md/DL": i[DATA_FIELDS.sgv],
                "BG mmol/L": roundDecimal(i[DATA_FIELDS.sgv] * 10 / 18.018, 1),
            } : {},
        );
    });
}
