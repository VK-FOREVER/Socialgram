type LoaderProps = {
  showTxt?: boolean;
  simple?: boolean;
};

const Loader = ({ showTxt = true, simple = false }: LoaderProps) => {
  return (
    <>
      <div className="flex-center w-full flex-col gap-2">
        {simple ? (
          <>
            <img
              className={`${simple ? "w-10" : " w-16"} `}
              src="/assets/icons/loader.svg"
              alt="Loading..."
            />
            {showTxt && (
              <span className=" text-base text-white">Loading...</span>
            )}
          </>
        ) : (
          <>
            <img
              className="w-16 "
              src="/assets/images/spinner.gif"
              alt="Loading..."
            />
            {showTxt && (
              <span className=" text-base text-white">Loading...</span>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Loader;
