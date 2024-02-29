type LoaderProps = {
  showTxt?: boolean;
};

const Loader = ({ showTxt = true }: LoaderProps) => {
  return (
    <>
      <div className="flex-center w-full flex-col gap-2">
        <img src="/assets/icons/loader.svg" alt="Loading..." />
        {showTxt && <span className=" text-base text-white">Loading...</span>}
      </div>
    </>
  );
};

export default Loader;
