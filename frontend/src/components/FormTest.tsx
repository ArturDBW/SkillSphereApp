import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// type FormFields = {
//   email: string;
//   password: string;
// };

type FormFields = z.infer<typeof schema>;

export const FormTest = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@gmail.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //   throw new Error();
      console.log(data);
    } catch (err) {
      setError("email", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="text" placeholder="Email" />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
