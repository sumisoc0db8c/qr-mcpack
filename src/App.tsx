import { useState } from "react";
import { generateImage, generateMatrix } from "./utils/qr";
import { generateCommands } from "./utils/mcfunction";
import { validateInput } from "./utils/validate";
import { generateMcpack } from "./utils/mcpack";


function App() {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);



  const handleGenerate = async () => {
    // 入力チェック
    const error = validateInput(text)
    if ( error ){
      alert(error);
      return;
    }

    // 画像生成
    const qrImage = await generateImage(text);
    setImage(qrImage);

    // コマンド生成
    const matrix = generateMatrix(text);
    const commands = generateCommands(matrix);

    // ファイル生成
    const blob = await generateMcpack(commands, text, qrImage);
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);

  };

  return (
    <div className="flex flex-col">
      <input
        className="border p-2 mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="QRコードにしたい文字列"
      />
      <button className="p-2 bg-blue-500 text-white mb-4" onClick={handleGenerate}>
        生成
      </button>

      {image && <img src={image} alt="QR Code" className="mt-4" />}

      {/* ダウンロードボタン */}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download="QRコード生成アドオン.mcpack"
          className="p-2 bg-green-500 text-white text-center"
        >
          ダウンロード
        </a>
      )}
    </div>
  );
}

export default App;