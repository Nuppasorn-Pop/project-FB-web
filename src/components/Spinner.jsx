import { LoaderIcon } from "../icon";

export default function Spinner({ transparent }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-white z-40 ${
          transparent ? "opacity-70" : ""
        }`}
      ></div>
      <div className="fixed inset-0 z-50  flex justify-center items-center animate-spin">
        <LoaderIcon />
      </div>
    </>
  );
}
