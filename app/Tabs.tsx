import React from "react";

const Tabs = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        <div className="flex flex-col flex-1 items-center justify-center cursor-pointer">
          <h1 className="text-sm md:text-base font-medium">Exchange Klayr for Mobile Money. </h1>

          <div className="w-full rounded-l-full h-1 mt-2 md:h-2 md:mt-4 bg-black"></div>
        </div>

        {/* <div className="flex flex-col flex-1 items-center justify-center cursor-pointer">
          <h1 className=" text-sm md:text-base font-thin">Buy</h1>

          <div className="w-full rounded-r-full h-1 mt-2 md:h-2 md:mt-4 bg-neutral-300"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Tabs;
