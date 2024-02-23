import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { API } from "../../utils/api";
import { AxiosError } from "axios";

const schema = z
  .object({
    name: z.string().min(1, { message: "Please provide username" }),
    email: z.string().email({ message: "Valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must be the same",
    path: ["confirmPassword"], // path of error
  });

type FormValues = z.infer<typeof schema>;

export const SignUp = () => {
  const inputStyled = `mx-auto min-w-80 rounded-full  bg-sky-100 px-6 py-2 outline-none`;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleCreateAccount = async (data: FormValues) => {
    try {
      const response = await API.post("/skillsphere/users/signup", data);

      console.log("Konto zostało utworzone pomyślnie", response);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          setError("email", {
            message: "This email is already taken",
          });
        }
      }
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    handleCreateAccount(data);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h2 className=" text-center text-4xl font-bold">Welcome!</h2>
      <span className="mb-10 mt-2 text-lg text-stone-400">Create account</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className={inputStyled}
        />
        {errors.name && (
          <div className="w-full px-2 text-red-500">{errors.name.message}</div>
        )}
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          className={inputStyled}
        />
        {errors.email && (
          <div className="w-full px-2 text-red-500">{errors.email.message}</div>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className={inputStyled}
        />
        {errors.password && (
          <div className="w-full px-2 text-red-500">
            {errors.password.message}
          </div>
        )}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          className={inputStyled}
        />
        {errors.confirmPassword && (
          <div className="w-full px-2 text-red-500">
            {errors.confirmPassword.message}
          </div>
        )}
        <div className="mb-1 mt-[-12px] h-5 w-full px-1 text-red-500">
          {errors.root && <span>{errors.root.message}</span>}
        </div>
        <button
          type="submit"
          className="mt-8 rounded-full bg-blue-400 px-10 py-3 font-bold text-white duration-150 hover:bg-blue-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
