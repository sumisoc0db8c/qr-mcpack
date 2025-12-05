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
  <div className="card bg-base-100 shadow-sm">
    <div className="card-body">
    <input
      type="text"
      className="input my-1"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="QRコードにしたい文字列"
    />
    
    <button className="btn btn-primary btn-block my-1"
      onClick={handleGenerate}
    >
      生成
    </button>
    <div className="my-3 w-64 h-48">
    {image ? (
      <img
        src={image}
        alt="QR Code"
        className="mx-auto w-48 rounded-md shadow-md"
      />
    ):(
      <div className="" />
    )}
    </div>
    <div className="my-3">
    {downloadUrl ? (
      <a
        href={downloadUrl}
        download="QRコード生成アドオン.mcpack"
        className="btn btn-success btn-block"
      >
        ダウンロード
      </a>
    ):(
      <div className="p-2 h-10" />
    )}
    </div>
  </div>
  </div>
);
}

export default App;