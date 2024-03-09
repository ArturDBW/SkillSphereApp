import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { API } from "../../utils/api";

const schema = z
  .object({
    title: z
      .string()
      .min(5, { message: "Title should have at least 5 characters" })
      .max(50, { message: "Title should have max 50 characters" }),
    //   image: z.string().url();,
    author: z.string(),
    price: z.string(),
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
  const errorStyled = `h-5 w-full px-2 text-sm text-red-500`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const createCourse = async (data: FormValues) => {
    try {
      const response = await API.post("/skillsphere/courses", data);
      console.log(response, "Dodano nowy kurs!");
    } catch (err) {
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
      <input {...register("author")} type="text" className={inputStyled} />
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
      <button
        type="submit"
        className="mt-8 w-40 rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
      >
        Submit
      </button>
    </form>
  );
};
