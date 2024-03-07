import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { API } from "../../utils/api";
import { AxiosError } from "axios";

const schema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 character" }),
  email: z
    .string()
    .min(1, { message: "Provide email" })
    .email({ message: "Valid email" }),
});

type FormValues = z.infer<typeof schema>;

export const UpdatePersonalDataForm = () => {
  const inputStyled = `max-w-96 rounded-xl px-2 py-2 outline-none border-2 focus:border-yellow-500 duration-150`;
  const errorStyled = `h-5 w-full px-2 text-sm text-red-500`;

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const updateUserData = async (data: FormValues) => {
    try {
      const response = await API.patch("/skillsphere/users/updateMe", data);
      console.log("Zaaktualizowano dane uzytkownika", response);
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
    updateUserData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-4">
      <label>Full name</label>
      <input
        {...register("name")}
        type="text"
        placeholder=""
        className={inputStyled}
      />
      <div className={errorStyled}>
        {errors.name ? `${errors.name.message}` : null}
      </div>
      <label>Email</label>
      <input
        {...register("email")}
        type="text"
        placeholder=""
        className={inputStyled}
      />
      <div className={errorStyled}>
        {errors.email ? `${errors.email.message}` : null}
        {errors.root && <span>{errors.root.message}</span>}
      </div>
      <button
        type="submit"
        className="mt-8 w-40 rounded-xl bg-yellow-500 px-6 py-3"
      >
        Submit
      </button>
    </form>
  );
};
