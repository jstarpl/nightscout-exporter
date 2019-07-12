function hexString(buffer: ArrayBuffer) {
    const byteArray = new Uint8Array(buffer) as unknown as number[];

    const hexCodes = [...byteArray].map((value) => {
        const hexCode = value.toString(16);
        const paddedHexCode = hexCode.padStart(2, "0");
        return paddedHexCode;
    });

    return hexCodes.join("");
}

function digestMessage(message): PromiseLike<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return window.crypto.subtle.digest("SHA-1", data);
}

export function sha1(text: string): PromiseLike<string> {
    return digestMessage(text).then((value) => hexString(value));
}
