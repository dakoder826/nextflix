function Box({ children }) {
  return (
    <div className="w-[28rem] overflow-auto bg-background-darker">
      {children}
    </div>
  );
}

export default Box;
