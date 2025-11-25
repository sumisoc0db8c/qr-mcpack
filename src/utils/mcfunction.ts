/** 色判定してコンクリートを返す */
function judgeConcreteColor(bit: number): string {
    return bit === 1 ? "minecraft:black_concrete" : "minecraft:white_concrete";
}

/** 座標を生成する */
function generateCoordinate(x: number, z: number): string {
    return `~${x}~-1~${z}`;
}

/** setblockコマンド生成 */
export function generateCommands(matrix: number[][]): string[] {
    const commands: string[] = [];
    const length = matrix.length;

    for (let z = 0; z < length; z++) {
        for (let x = 0; x < length; x++) {
            const bit = matrix[z][x];
            const concrete = judgeConcreteColor(bit);
            const coordinate = generateCoordinate(x, z);

            const command = `setblock ${coordinate} ${concrete}\n`;
            commands.push(command);
        }
    }
    return commands;
}
