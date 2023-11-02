const InputError = (props: any) => {
  //   console.log(props);
  return (
    <p
      id="outlined_error_help"
      className="mt-2 text-xs text-red-600 dark:text-red-400 text-left"
    >
      <span className="font-medium">Oh, Error! {props}</span>
    </p>
  );
};
export default InputError;
