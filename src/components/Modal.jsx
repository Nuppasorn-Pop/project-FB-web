import { useEffect } from "react";
import { createPortal } from "react-dom";
export default function Modal({
  width = 30,
  title,
  children,
  onOpen,
  onClose,
}) {
  useEffect(() => {
    const handlePressEsc = (e) => {
      if (e.keyCode === 27) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handlePressEsc);
    return () => document.removeEventListener("keydown", handlePressEsc);
  }, [onClose]);

  return (
    <>
      {onOpen
        ? createPortal(
            <>
              <div className="fixed inset-0 bg-white opacity-40 z-30"></div>
              <div className="fixed inset-0 z-40">
                <div className="flex justify-center items-center min-h-screen">
                  <div
                    className="bg-white rounded-lg shadow-lg"
                    style={{ width: `${width}rem` }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center p-4 border-b">
                      <button className="invisible">&#10005;</button>
                      <h5 className="text-2xl font-medium">{title}</h5>
                      <button onClick={onClose}>&#10005;</button>
                    </div>
                    <div className="p-4">{children}</div>
                  </div>
                </div>
              </div>
            </>,
            document.getElementById("modal")
          )
        : null}
    </>
  );
}
