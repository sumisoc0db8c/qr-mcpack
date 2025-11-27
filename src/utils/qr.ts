import QRCode from "qrcode";

/**
 * 入力文字列から QRコードの 2D 配列を生成
 * 黒: 1, 白: 0
 */
export function generateMatrix(text: string): QRCode.BitMatrix {
  const qr = QRCode.create(text);
  return qr.modules;
}

/**
 * QRコードの画像を生成する
 * 
 * @param text QRコード生成文字列
 * @returns QRコードの画像url
 */
export async function generateImage(text: string):Promise<string>{
  return await QRCode.toDataURL(text);
}