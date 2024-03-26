import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { API } from "../../utils/api";
import { AxiosError } from "axios";
import { AlertContext } from "../../ui/AppLayout";
import { useContext } from "react";

const schema = z
  .object({
    passwordCurrent: z.string(),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must be the same",
    path: ["passwordConfirm"],
  });

type FormValues = z.infer<typeof schema>;

export const UpdatePasswordForm = () => {
  const inputStyled = `max-w-96 rounded-xl px-2 py-2 outline-none border-2 focus:border-yellow-500 duration-150`;
  const errorStyled = `h-5 w-full px-2 text-sm text-red-500 max-[480px]:h-10`;

  const alertContext = useContext(AlertContext);
  if (!alertContext) {
    throw new Error("AlertContext not provided");
  }
  const { setShowAlert, setAlertInfo } = alertContext;

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const updatePassword = async (data: FormValues) => {
    try {
      await API.patch("skillsphere/users/updateMyPassword", data);
      setAlertInfo("The password has been updated");
      setShowAlert(true);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setError("root", {
            message: "Incorrect password",
          });
        }
      }
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    updatePassword(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-4">
      <label>Current Password</label>
      <input
        {...register("passwordCurrent")}
        type="password"
        className={inputStyled}
      />
      <div className={errorStyled}>
        {errors.root ? `${errors.root.message}` : null}
      </div>
      <label>New Password</label>
      <input
        {...register("password")}
        type="password"
        className={inputStyled}
      />
      <div className={errorStyled}>
        {errors.password ? `${errors.password.message}` : null}
      </div>
      <label>Confirm New Password</label>
      <input
        {...register("passwordConfirm")}
        type="password"
        className={inputStyled}
      />
      <div className={errorStyled}>
        {errors.passwordConfirm ? `${errors.passwordConfirm.message}` : null}
      </div>
      <button
        type="submit"
        className="mt-8 w-40 rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
      >
        Submit
      </button>
    </form>
  );
};
