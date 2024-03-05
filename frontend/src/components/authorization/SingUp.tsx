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
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export const SignUp = () => {
  const inputStyled = `mx-auto min-w-80 rounded-full px-6 py-2 outline-none border-2 focus:border-yellow-500 duration-150`;
  const errorStyled = `h-5 w-full px-2 text-sm text-red-500`;

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
        <div className={errorStyled}>
          {errors.name ? `${errors.name.message}` : null}
        </div>

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
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          className={inputStyled}
        />
        <div className={errorStyled}>
          {errors.confirmPassword ? `${errors.confirmPassword.message}` : null}
        </div>
        <div className="mb-1 mt-[-12px] h-5 w-full px-1 text-red-500">
          {errors.root && <span>{errors.root.message}</span>}
        </div>
        <button
          type="submit"
          className="mt-8 rounded-full bg-yellow-500 px-10 py-3 font-bold text-white outline-none duration-150 hover:bg-yellow-400"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
