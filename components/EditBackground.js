import { Upload } from "antd";
import React, { useCallback, useState } from "react";
import { convertToBase64 } from "../helpers/convertToBase64";

function EditBackground() {
  const [background, setBackground] = useState("");
  const handleCreateBase64 = useCallback(async (e) => {
    const file = e.fileList[0].originFileObj;
    const base64 = await convertToBase64(file);
    setBackground(base64);
  }, []);

  return (
    <div className="flex flex-col">
      <Upload maxCount={1} onChange={handleCreateBase64} showUploadList={false}>
        <button className=" m-2 bg-blue-300 hover:bg-blue-400 text-gray-800 py-2 px-7 border-gray-400 rounded shadow">
          Upload background
        </button>
      </Upload>
      <img src={background} />
      <button className=" m-2 bg-red-300 hover:bg-red-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow">
        Remove background
      </button>
    </div>
  );
}

export default EditBackground;
