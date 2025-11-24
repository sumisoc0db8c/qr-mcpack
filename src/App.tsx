import { useState } from "react";
import QRCode from "qrcode";

function App() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  const generateQR = async () => {
    try {
      const qr = await QRCode.toDataURL(text);
      setUrl(qr);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col">
      <input
        className="border p-2 mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="QRコードにしたい文字列"
      />
      <button className="p-2 bg-blue-500 text-white mb-4" onClick={generateQR}>
        生成
      </button>
      {url && <img src={url} alt="QR Code" className="mt-4" />}
    </div>
  );
}

export default App;