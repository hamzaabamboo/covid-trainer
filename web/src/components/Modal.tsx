import React from "react";
import { Spinner } from "./Spinner";

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  closable = false,
  maskClose = true,
  buttons,
  loading,
  onClose = () => {},
}) => {
  return (
    <div
      className="fixed w-screen min-h-screen top-0 z-40 left-0"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-screen h-screen overflow-y-scroll">
        <div
          className="absolute bg-black opacity-50 z-40 w-full h-full"
          onClick={() => maskClose && closable && onClose()}
        ></div>
        <div className="relative lg:w-3/5 w-4/5 mx-auto p-4 my-20 z-50 bg-white shadow-3 rounded-lg">
          {title && <ModalTitle>{title}</ModalTitle>}
          <div className="block mb-2">{children}</div>
          {closable && (
            <>
              <hr className="mb-2" />
              <div
                className={`flex ${loading ? "justify-end" : "justify-end"}`}
              >
                {loading && (
                  <div className="flex items-center">
                    <Spinner />
                    <span className="">{loading}</span>
                  </div>
                )}
                <div className="self-end">
                  <button
                    className="p-2 bg-red-500 right-0 ml-2 text-white rounded-lg shadow-md"
                    onClick={(evt) => {
                      evt.stopPropagation();
                      onClose();
                    }}
                  >
                    ปิด / Close
                  </button>
                  {buttons &&
                    buttons.map((b) => (
                      <button
                        key={"btn-" + b.label}
                        className={`p-2 ${b.class} right-0 ml-2 text-white rounded-lg shadow-md`}
                        onClick={(evt) => {
                          evt.stopPropagation();
                          b.onClick();
                        }}
                      >
                        {b.label}
                      </button>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ModalTitle: React.FC = ({ children }) => {
  return (
    <>
      <h3 className="text-2xl font-bold mb-2">{children}</h3>
      <hr className="mb-2" />
    </>
  );
};

export interface ModalProps {
  title?: string;
  closable?: boolean;
  maskClose?: boolean;
  onClose?: () => void;
  loading?: string;
  buttons?: { label: string; onClick: () => void; class: string }[];
}
