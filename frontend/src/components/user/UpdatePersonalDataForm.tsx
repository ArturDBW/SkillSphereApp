import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { API } from "../../utils/api";
import { AxiosError } from "axios";
import { useContext } from "react";
import { AlertContext } from "../../ui/AppLayout";

const schema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 character" }),
  email: z
    .string()
    .min(1, { message: "Provide email" })
    .email({ message: "Valid email" }),
  imageCover: z.any(),
});

type FormValues = z.infer<typeof schema>;

export const UpdatePersonalDataForm = () => {
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

  const updateUserData = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("imageCover", data.imageCover[0]);

      await API.patch("/skillsphere/users/updateMe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAlertInfo("The data has been updated");
      setShowAlert(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
      <label
        htmlFor="imageCover"
        className="mt-2 w-max cursor-pointer rounded-xl bg-yellow-500 px-4 py-3 font-bold text-white hover:bg-yellow-400"
      >
        Update profile photo
      </label>
      <input
        {...register("imageCover")}
        type="file"
        accept="image/*"
        className="hidden"
        id="imageCover"
      />
      <button
        type="submit"
        className="mt-8 w-40 rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
      >
        Save
      </button>
    </form>
  );
};
