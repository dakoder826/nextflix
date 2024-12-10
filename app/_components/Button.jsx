import SpinnerMini from "./SpinnerMini";

function Button({ onClick, children, type, isPending }) {
  const colorStyles = `
    ${type === "delete" ? "bg-red-dark hover:bg-red-light" : "bg-primary-dark hover:bg-primary-light"}
  `;

  return (
    <button
      className={`text-md cursor-pointer rounded-3xl border-0 px-8 py-2 text-white transition-all duration-300 ${colorStyles} disabled:cursor-not-allowed disabled:opacity-60`}
      onClick={onClick}
      disabled={isPending}
    >
      {isPending ? <SpinnerMini /> : children}
    </button>
  );
}

export default Button;
