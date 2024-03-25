import { FiCheck } from "react-icons/fi";

type AlertComponentProps = {
  alertInfo: string;
};

export const AlertComponent = ({ alertInfo }: AlertComponentProps) => {
  return (
    <div className="absolute right-1/2 top-20 z-50 flex translate-x-1/2 items-center rounded-xl bg-green-500 p-4 text-lg">
      <FiCheck />
      <span className="ml-4">{alertInfo}.</span>
    </div>
  );
};
