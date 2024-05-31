import { useRef } from "react";
import FormButton from "./FormButton";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

export default function PictureForm({ title, initialImage, render, onSave }) {
  const [file, setFile] = useState(null);
  const fileElement = useRef(); // ex. useRef() return เป็น {current: undefined }
  // fileElement.current = 200 // {current: 200} ==> ทุกครั้งที่มี rerender มันจะจด value ล่าสุดที่กำหนดค่า
  const [loading, setLoading] = useState(false);

  const hadleClickSave = async () => {
    try {
      if (file) {
        setLoading(true);
        await onSave(file);
        // req.body formData เป็น new FormData() มันจะแปลเเป็น type form-data ให้กับ backend อัตโนมัติ
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Spinner transparent />}
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
              <FormButton onClick={hadleClickSave}>Save</FormButton>
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
        {render(file ? URL.createObjectURL(file) : initialImage)}
      </div>
    </div>
  );
}
