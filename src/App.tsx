import { useState } from "react";
import { generateMatrix } from "./utils/qr";
import { generateCommands } from "./utils/mcfunction";


function App() {
  const [text, setText] = useState("");
  const [commands, setCommands] = useState<string>("");


  const handleGenerate = () => {
    const arr = generateMatrix(text);
    const commands = generateCommands(arr);
    setCommands(commands.join(""));

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
    </div>
  );
}

export default App;