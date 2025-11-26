/** 色判定してコンクリートを返す */
function judgeConcreteColor(bit: number): string {
    return bit === 1 ? "minecraft:black_concrete" : "minecraft:white_concrete";
}

/** 座標を生成する */
function generateCoordinate(x: number, y: number, length: number): string {
    return `~${length - x}~${length - y}~1`;
}

/** setblockコマンド生成 */
export function generateCommands(matrix: number[][]): string[] {
    const commands: string[] = [];
    const length = matrix.length;

    for (let y = 0; y < length; y++) {
        for (let x = 0; x < length; x++) {
            const bit = matrix[y][x];
            const concrete = judgeConcreteColor(bit);
            const coordinate = generateCoordinate(x, y, length);

            const command = `setblock ${coordinate} ${concrete}\n`;
            commands.push(command);
        }
    }
    return commands;
}
