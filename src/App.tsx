import { useState } from "react";
import { generateImage, generateMatrix } from "./utils/qr";
import { generateCommands } from "./utils/mcfunction";
import { validateInput } from "./utils/validate";
import { generateMcpack } from "./utils/mcpack";


function App() {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [commands, setCommands] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);



  const handleGenerate = async () => {
    const error = validateInput(text)
    if ( error ){
      alert(error);
      return;
    }

    const qr = await generateImage(text);
    setImage(qr);

    const arr = generateMatrix(text);
    const commands = generateCommands(arr).join("");
    setCommands(commands);

    // ファイル生成
    const blob = await generateMcpack(commands, text, qr);
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
      {/* コマンド表示用テキストボックス */}
      <textarea
        className="border p-2 h-64 font-mono"
        value={commands}
        readOnly
      />
      {image && <img src={image} alt="QR Code" className="mt-4" />}

      {/* ダウンロードボタン */}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download="qr.mcpack"
          className="p-2 bg-green-500 text-white text-center"
        >
          ダウンロード
        </a>
      )}
    </div>
  );
}

export default App;