export const UpdatePersonalDataForm = () => {
  const inputStyled = `max-w-96 rounded-xl px-6 py-2 outline-none border-2 focus:border-yellow-500 duration-150`;
  return (
    <form className="flex flex-col py-4">
      <label>Full name</label>
      <input type="text" placeholder="" className={inputStyled} />
      <div>error</div>
      <label>Email</label>
      <input type="text" placeholder="" className={inputStyled} />
      <div>error</div>
      <button
        type="submit"
        className="mt-8 w-40 rounded-xl bg-yellow-500 px-6 py-3"
      >
        Submit
      </button>
    </form>
  );
};
