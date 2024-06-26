import { zodResolver } from "@hookform/resolvers/zod";
import { API } from "../../utils/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AxiosError } from "axios";
import { useContext } from "react";
import { AlertContext } from "../../ui/AppLayout";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Provide email" })
    .email({ message: "Valid email" }),
  password: z.string().min(1, { message: "Provide password" }),
});

type FormValues = z.infer<typeof schema>;

export const Login = () => {
  const inputStyled = `mx-auto min-w-80 rounded-full px-6 py-2 outline-none border-2 focus:border-yellow-500 duration-150 max-[480px]:min-w-full`;
  const errorStyled = `h-5 w-full px-2 text-sm text-red-500`;

  const alertContext = useContext(AlertContext);
  if (!alertContext) {
    throw new Error("AlertContext not provided");
  }
  const { setShowAlert, setAlertInfo } = alertContext;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleLogin = async (data: FormValues) => {
    try {
      await API.post("/skillsphere/users/login", data);
      setAlertInfo("Logged successfully");
      setShowAlert(true);
      window.setTimeout(() => {
        location.assign("/courses");
      }, 500);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setError("password", {
            message: "Incorrect email or password",
          });
        }
      }
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    handleLogin(data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-4xl font-bold max-[480px]:text-2xl">
        Nice to see you again!
      </h2>
      <span className="mb-10 mt-2 text-lg text-stone-400 max-[480px]:mb-5 max-[480px]:text-sm">
        Login to your account
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          className={inputStyled}
        />
        <div className={errorStyled}>
          {errors.email ? `${errors.email.message}` : null}
        </div>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className={inputStyled}
        />
        <div className={errorStyled}>
          {errors.password ? `${errors.password.message}` : null}
        </div>
        <div className="mt-2 flex w-full justify-between px-1 ">
          <span className="max-sm:text-xs">Remember me</span>
          <span className="text-blue-500 underline max-sm:text-xs">
            Forgot your password?
          </span>
        </div>
        <button
          type="submit"
          className="mt-8 rounded-full bg-yellow-500 px-10 py-3 font-bold text-white outline-none duration-150 hover:bg-yellow-400 max-[480px]:mt-6"
        >
          Log in
        </button>
      </form>
    </div>
  );
};
