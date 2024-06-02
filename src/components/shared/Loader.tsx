type LoaderProps = {
  showTxt?: boolean;
};

const Loader = ({ showTxt = true }: LoaderProps) => {
  return (
    <>
      <div className="flex-center w-full flex-col gap-2">
        <img
          className="w-16 "
          src="/assets/images/spinner.gif"
          alt="Loading..."
        />
        {showTxt && <span className=" text-base text-white">Loading...</span>}
      </div>
    </>
  );
};

export default Loader;
