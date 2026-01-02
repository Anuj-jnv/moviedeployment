const SecondaryCard = ({ pill, content, info, gradient }) => {
    return (
      <div
        className={`w-full max-w-[15rem] h-[12rem] sm:w-[12rem] sm:h-[10rem] md:w-[15rem] md:h-[12rem] relative mt-10 bg-gradient-to-b ${gradient} rounded-lg shadow-lg mx-auto md:ml-5`}
      >
        <div
          className={`absolute -top-4 left-1/2 transform -translate-x-1/2 sm:left-16 md:left-[5rem] border bg-gradient-to-b ${gradient} rounded-full py-2 px-5 text-sm text-gray-800 font-semibold`}
        >
          {pill}
        </div>

        <div className="flex items-center justify-center h-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{content}</h2>
        </div>

        <div className="absolute bottom-4 left-4 sm:left-6 md:left-12 text-xs sm:text-sm text-white">{info}</div>
      </div>
    );
  };
  
  export default SecondaryCard;