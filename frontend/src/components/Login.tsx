export const Login = () => {
  const inputStyled = `mx-auto min-w-80 rounded-full  bg-sky-100 px-6 py-2 outline-none mb-4`;
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className=" text-center text-4xl font-bold">
        Nice to see you again!
      </h2>
      <span className="mb-10 mt-2 text-lg text-stone-400">
        Login to your account
      </span>
      <form onSubmit={() => {}} className="flex flex-col items-center">
        <input type="email" placeholder="Email" className={inputStyled} />
        <input type="text" placeholder="Password" className={inputStyled} />
        <div className="mt-2 flex w-full justify-between px-1">
          <span>Remember me</span>
          <span className="text-blue-500 underline">Forgot your password?</span>
        </div>
        <button
          type="submit"
          className="mt-8 rounded-full bg-blue-500 px-10 py-3 font-bold text-white"
        >
          Log in
        </button>
      </form>
    </div>
  );
};
