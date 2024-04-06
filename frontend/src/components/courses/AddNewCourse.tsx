import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { API } from "../../utils/api";
import { useContext } from "react";
import { AlertContext, UserContext } from "../../ui/AppLayout";
import { AxiosError } from "axios";

type UserProps = {
  email: string;
  name: string;
  id: string;
};

const schema = z
  .object({
    title: z
      .string()
      .min(5, { message: "Title should have at least 5 characters" })
      .max(50, { message: "Title should have max 50 characters" }),
    author: z.string(),
    price: z.string(),
    imageCover: z.any(),
    description: z
      .string()
      .min(5, { message: "Description should have at least 40 characters" }), // zmienic potem
  })
  .refine((data) => /^[1-9]\d*$/.test(data.price), {
    message: "Price must contain only numbers",
    path: ["price"],
  });

type FormValues = z.infer<typeof schema>;

export const AddNewCourse = () => {
  const inputStyled = `max-w-96 rounded-xl px-2 py-2 outline-none border-2 focus:border-yellow-500 duration-150`;
  const errorStyled = `h-5 w-full px-2 text-sm text-red-500 max-[480px]:h-10`;

  const alertContext = useContext(AlertContext);
  if (!alertContext) {
    throw new Error("AlertContext not provided");
  }
  const { setShowAlert, setAlertInfo } = alertContext;

  const user: UserProps | null = useContext(UserContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const createCourse = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("imageCover", data.imageCover[0]);

      await API.post("/skillsphere/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAlertInfo("A new course has been added");
      setShowAlert(true);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          setError("root", {
            message: "Provide course image",
          });
        }
      }
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    createCourse(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4">
      <label>Title</label>
      <input {...register("title")} type="text" className={inputStyled} />
      <div className={errorStyled}>
        {errors.title ? `${errors.title.message}` : null}
      </div>
      <label>Author</label>
      <input
        {...register("author")}
        type="text"
        readOnly
        value={user?.name ?? ""}
        className={`${inputStyled} text-stone-500`}
      />
      <div className={errorStyled}>
        {errors.author ? `${errors.author.message}` : null}
      </div>
      <label>Price</label>
      <input {...register("price")} type="text" className={inputStyled} />
      <div className={errorStyled}>
        {errors.price ? `${errors.price.message}` : null}
      </div>
      <label>Description</label>
      <input {...register("description")} type="text" className={inputStyled} />
      <div className={errorStyled}>
        {errors.description ? `${errors.description.message}` : null}
      </div>
      <label
        htmlFor="imageCover"
        className="mt-2 w-max cursor-pointer rounded-xl bg-yellow-500 px-4 py-3 font-bold text-white hover:bg-yellow-400"
      >
        Add photo
      </label>
      <input
        {...register("imageCover")}
        type="file"
        accept="image/*"
        className="hidden"
        id="imageCover"
      />
      <div className={errorStyled}>
        {errors.root ? `${errors.root.message}` : null}
      </div>
      <button
        type="submit"
        className="mt-8 w-40 rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
      >
        Create course
      </button>
    </form>
  );
};
