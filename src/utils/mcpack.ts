import JSZip from "jszip";


/**
 * manifest.jsonを生成する
 * 
 * @param text QRコードから読み取れる文字列
 * @returns manifest.jsonの文字列
 */
function generateManifest(text:string): string {
    const manifest = {
        format_version: 2,
        header: {
            name: "QRコード生成 : " + text,
            description: "「/function qr」コマンド実行でQRコードを生成します",
            uuid: crypto.randomUUID(),
            version: [1, 0, 0],
            min_engine_version: [1, 21, 124],
        },
        modules: [
            {
                type: "data",
                uuid: crypto.randomUUID(),
                version: [1, 0, 0],
            },
        ],
    }

    return JSON.stringify(manifest, null, 2);
}

/**
 * imageのDataURLからBlobを生成
 * 
 * @param url 画像のurl
 * @returns 画像ファイル
 */
async function generateImageBlob(url:string):Promise<Blob>{
    const res = await fetch(url);
    return await res.blob();
}

/**
 * .mcpackを生成する
 * 
 * @param commands コマンドを繋げた文字列
 * @param text QRコードから読み取れる文字列
 * @param image_url QRコードの画像url
 * @returns 
 */
export async function generateMcpack(commands: string, text:string, image_url:string): Promise<Blob> {
    const zip = new JSZip();

    // コマンドファイル生成
    const mcfunction = new Blob([commands], { type: "text/plain" });
    zip.file("functions/qr.mcfunction", mcfunction);

    // マニュフェスト生成
    zip.file("manifest.json", generateManifest(text))

    // アイコン生成
    const icon = await generateImageBlob(image_url)
    zip.file("pack_icon.png", icon)

    // zipファイル生成
    return zip.generateAsync({ type: "blob" });
}

