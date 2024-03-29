import { useContext, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { AlertContext } from "./AppLayout";

type AlertComponentProps = {
  alertInfo: string;
};

export const AlertComponent = ({ alertInfo }: AlertComponentProps) => {
  const context = useContext(AlertContext);

  useEffect(() => {
    if (context) {
      const timer = setTimeout(() => {
        context.setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [context]);

  if (!context) {
    return null;
  }

  const { showAlert } = context;

  return (
    <>
      {showAlert && (
        <div className="absolute right-1/2 top-20 z-50 flex min-w-72 translate-x-1/2 items-center rounded-xl bg-green-400 p-4 text-lg">
          <FiCheck />
          <span className="ml-4">{alertInfo}.</span>
        </div>
      )}
    </>
  );
};
