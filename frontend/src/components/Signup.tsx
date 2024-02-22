export const Signup = () => {
  const inputStyled = `mx-auto min-w-80 rounded-full  bg-sky-100 px-6 py-2 outline-none mb-4`;
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h2 className=" text-center text-4xl font-bold">Welcome!</h2>
      <span className="mb-10 mt-2 text-lg text-stone-400">Create account</span>
      <form onSubmit={() => {}} className="flex flex-col items-center">
        <input type="text" placeholder="Name" className={inputStyled} />
        <input type="email" placeholder="Email" className={inputStyled} />
        <input type="password" placeholder="Password" className={inputStyled} />
        <input
          type="password"
          placeholder="Confirm Password"
          className={inputStyled}
        />

        <button
          type="submit"
          className="mt-8 rounded-full bg-blue-500 px-10 py-3 font-bold text-white"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
