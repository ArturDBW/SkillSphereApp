import { FormTest } from "../components/FormTest";
import { Authorization } from "../components/authorization/Authorization";

export const Home = () => {
  return (
    <div>
      Home
      <Authorization />
      <FormTest />
    </div>
  );
};
