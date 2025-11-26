import QRCode from "qrcode";

/**
 * 入力文字列から QRコードの 2D 配列を生成
 * 黒: 1, 白: 0
 */
export function generateMatrix(text: string): number[][] {
  const qr = QRCode.create(text);
  const size = qr.modules.size;
  const arr: number[][] = [];

  for (let row = 0; row < size; row++) {
    const line: number[] = [];
    for (let col = 0; col < size; col++) {
      line.push(qr.modules.get(row, col) ? 1 : 0);
    }
    arr.push(line);
  }

  return arr;
}

/**
 * QRコードの画像を生成する
 * 
 * @param text QRコード生成文字列
 * @returns 
 */
export async function generateImage(text: string):Promise<string>{
  return await QRCode.toDataURL(text);
}