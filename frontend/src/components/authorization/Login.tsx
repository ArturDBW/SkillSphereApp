import { zodResolver } from "@hookform/resolvers/zod";
import { API } from "../../utils/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AxiosError } from "axios";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Provide email" })
    .email({ message: "Valid email" }),
  password: z.string().min(1, { message: "Provide password" }),
});

type FormValues = z.infer<typeof schema>;

export const Login = () => {
  const inputStyled = `mx-auto min-w-80 rounded-full bg-sky-100 px-6 py-2 outline-none`;
  const errorStyled = `h-5 w-full px-2 text-sm text-red-500`;

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
      const response = await API.post("/skillsphere/users/login", data);
      console.log("Zalogowanie pomyślne", response);
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
      <h2 className=" text-center text-4xl font-bold">
        Nice to see you again!
      </h2>
      <span className="mb-10 mt-2 text-lg text-stone-400">
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
        <div className="mt-2 flex w-full justify-between px-1">
          <span>Remember me</span>
          <span className="text-blue-500 underline">Forgot your password?</span>
        </div>
        <button
          type="submit"
          className="mt-8 rounded-full bg-blue-400 px-10 py-3 font-bold text-white duration-150 hover:bg-blue-500"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

// const logout = async () => {
//   try {
//     const response = await API.get("/skillsphere/users/logout");
//     console.log(response);
//     if (response.data.status === "success") location.reload();
//   } catch (err) {
//     console.error("Bład wylogowania", err);
//   }
// };
