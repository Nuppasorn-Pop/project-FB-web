import { useRef } from "react";
import Avatar from "../../../components/Avatar";
import FormButton from "./FormButton";
import { useState } from "react";
export default function PictureForm({ title, initialImage }) {
  const [file, setFile] = useState(null);
  const fileElement = useRef(); // ex. useRef() return เป็น {current: undefined }
  // fileElement.current = 200 // {current: 200} ==> ทุกครั้งที่มี rerender มันจะจด value ล่าสุดที่กำหนดค่า

  return (
    <div>
      <input
        type="file"
        ref={fileElement}
        className="hidden"
        onChange={(e) => {
          if (e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />
      {/* ==> ref = {current: document.getElementById() == <input />} */}
      <div className="flex justify-between items-center p-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex">
          {file && (
            <>
              <FormButton>Save</FormButton>
              <FormButton
                onClick={() => {
                  setFile(null);
                  fileElement.current.value = "";
                }}
              >
                Cancel
              </FormButton>
            </>
          )}

          <FormButton onClick={() => fileElement.current.click()}>
            Edit
          </FormButton>
        </div>
      </div>
      <div className="flex justify-center">
        <Avatar
          size={10.5}
          src={file ? URL.createObjectURL(file) : initialImage}
        />
      </div>
    </div>
  );
}
