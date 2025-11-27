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
  <div className="flex flex-col mx-auto p-6 space-y-4 w-full">
    <input
      className="border rounded-md p-2 focus:ring-2 focus:ring-blue-400 bg-white"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="QRコードにしたい文字列"
    />
    
    <button
      className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      onClick={handleGenerate}
    >
      生成
    </button>

    {image ? (
      <img
        src={image}
        alt="QR Code"
        className="mt-4 mx-auto border rounded-md shadow-md w-48 h-48"
      />
    ):(
      <div className="mt-4 w-48 h-48" />
    )}

    {downloadUrl ? (
      <a
        href={downloadUrl}
        download="QRコード生成アドオン.mcpack"
        className="p-2 h-10 bg-green-500 text-white text-center rounded-md hover:bg-green-600"
      >
        ダウンロード
      </a>
    ):(
      <div className="p-2 h-10" />
    )}
  </div>
);
}

export default App;