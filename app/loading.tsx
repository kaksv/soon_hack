import { Container, Flex, Tabs } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingPage = () => {
  return (
    <main className="h-screen w-full">
      <Container
        size="1"
        p="3"
        className=" h-full flex items-center justify-center"
      >
        <Flex gap="7">
          <Skeleton width="3rem" />
          <Skeleton width="3rem" />
        </Flex>

        <div className="flex mt-14 flex-1 ">
          <Skeleton width="5rem" height="6rem" />
          <div className="flex flex-row items-center w-full gap-4">
            <div className="bg-neutral-100 flex w-1/3 px-7 border gap-4 border-neutral-500 rounded-md items-center justify-center h-full">
              <h3 className="hidden md:block font-medium text-sm md:text-base">
                KLAYR
              </h3>
            </div>
            {/* <input
              type="number"
              className="w-full border bg-neutral-100 p-4 rounded-md border-neutral-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            /> */}
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center h-12 mt-3">
          {/* <SlArrowUp />
          <SlArrowDown /> */}
        </div>

        <p className="text-center mb-4 text-xs md:text-base">
          Select your currency
        </p>
        <div className="flex  flex-1 ">
          <div className="flex flex-row items-center w-full gap-4">
            {/* <SelectCurrency
              setSelectedCurrency={setSelectedCurrency}
              setCode={setCode}
            />

            <input
              type="tel"
              className="w-full border bg-neutral-100 p-4 rounded-md border-neutral-500"
              onChange={(e) => setPhone(e.target.value)}
            /> */}
          </div>
        </div>

        {/* <ExchangeRates
          currency={selectedCurrency}
          token="cUSD"
          amount={Number(amount)}
        /> */}

        <button
          // onClick={handleSubmit}
          className="w-full p-4 bg-black text-sm md:text-base rounded-full text-white font-bold"
        >
          Confirm
        </button>
      </Container>

      <div className="w-full flex items-center justify-center">
        <p>
          By <span className="font-bold"> Oneramp</span>
        </p>
      </div>
    </main>
  );
};

export default LoadingPage;
