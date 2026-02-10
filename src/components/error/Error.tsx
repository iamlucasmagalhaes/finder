type ErrorProps = {
  msg: string;
};

const Error = ({ msg }: ErrorProps) => {
  return (
    <div>
      <p>{msg}</p>
    </div>
  );
};

export default Error;