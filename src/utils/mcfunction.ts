import QRCode from "qrcode";

/**
 * コンクリートの色を判定する
 * 
 * @param bit 1:黒、0:白
 * @returns コンクリート
 */
function judgeConcreteColor(bit: number): string {
    return bit === 1 ? "minecraft:black_concrete" : "minecraft:white_concrete";
}

/**
 * コマンドの座標部分を生成する
 * 
 * @param x 東西方向
 * @param y 高さ
 * @param length 左上から生成するためのオフセット
 * @returns 相対座標
 */
function generateCoordinate(x: number, y: number, length: number): string {
    return `~${length - x}~${length - y}~1`;
}

/**
 * コマンドを組み立てる
 * 
 * @param matrix QRコードの 2D 配列(0, 1)
 * @returns setblockコマンド
 */
export function generateCommands(matrix: QRCode.BitMatrix): string {
    const commands: string[] = [];
    const length = matrix.size;

    for (let y = 0; y < length; y++) {
        for (let x = 0; x < length; x++) {
            const bit = matrix.get(x, y);
            const concrete = judgeConcreteColor(bit);
            const coordinate = generateCoordinate(x, y, length);

            const command = `setblock ${coordinate} ${concrete}`;
            commands.push(command);
        }
    }
    return commands.join("\n");
}
