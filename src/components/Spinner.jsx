import { LoaderIcon } from "../icon";

export default function Spinner() {
  return (
    <>
      <div className="fixed inset-0 bg-white z-40"></div>
      <div className="fixed inset-0 z-50  flex justify-center items-center animate-spin">
        <LoaderIcon />
      </div>
    </>
  );
}
