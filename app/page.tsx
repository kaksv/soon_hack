"use client";

import { Callout, Container, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import Tabs from "./Tabs";

import { countryPhonePrefixes } from "@/data";
import { OneRamp } from "@oneramp/sdk";
import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import cUSDToken from "../assets/tokens/cusd.png";
import klayrToken from "../assets/tokens/klayr.png";
import ExchangeRates from "./ExchangeRates";
import SelectCurrency from "./SelectCurrency";
import soonToken from "../assets/tokens/soon.png";
import Spinner from "./Spinner";

const clientPub = process.env.NEXT_ONERAMP_CLIENT!;
const secretKey = process.env.NEXT_ONERAMP_SECRET!;

export default function Home() {
  const [amount, setAmount] = useState<number | string>(1);
  const [selectedCurrency, setSelectedCurrency] = useState("UGX");
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState(countryPhonePrefixes["UGX"]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("")

  const [provider, setProvider] = useState<any>();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth", // Optional, for a smooth scrolling animation
      });
    }

    // // Ensure MiniPay provider is available
    // if (window.ethereum && window.ethereum.isMiniPay) {
    //   // const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const provider = new ethers.BrowserProvider(window.ethereum);

    //   setProvider(provider);
    // } else {
    //   console.error("MiniPay provider not detected");
    // }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!phone || phone.length < 10) {
        setError(
          "Invalid entries, Please verify that you've entered the correct phone number and amount."
        );
      }

      const { ethereum } = window;

      const provider = new ethers.BrowserProvider(ethereum);

      const signer = await provider.getSigner();

      const oneramp = new OneRamp(
        "celo",
        clientPub,
        secretKey,
        provider,
        signer
      );

      const result = await oneramp.offramp("stable", Number(amount), phone);

      if (result.success) {
        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
        setError("❌ Transaction progress failed!");
      }
    } catch (error) {
      setLoading(false);
      setError("⛔️ Process failed!, something went wrong");
    }
  };

  return (
    <div
      className="h-full w-full overflow-y-auto  md:py-0 md:p-4 "
      ref={containerRef}
    >
      <Container
        size="1"
        p="2"
        className=" h-full flex items-center  md:justify-center  "
      >
        <form onSubmit={handleSubmit} className="bg-gray-300 rounded-[10px] p-4 shadow-md">
          {success && (
            <Callout.Root color="green" mb="2">
              <Callout.Text size="1">
                🎉 Success! Your withdraw to mobile money was successful
              </Callout.Text>
            </Callout.Root>
          )}

          {error && (
            <Callout.Root color="red" mb="2">
              <Callout.Text size="1">{error}</Callout.Text>
            </Callout.Root>
          )}

          <Flex gap="7">
            <Tabs />
          </Flex>

          <div className="flex mt-8 flex-1 ">
            <div className="flex flex-row items-center w-full gap-4">
              <div className="bg-neutral-100 flex w-1/3 px-7 border gap-2 md:gap-4 border-neutral-300 rounded-md items-center justify-center py-3 md:py-0 md:h-full">
                <Image
                  src={soonToken}
                  style={{ width: 20, height: 20 }}
                  alt="SOON token"
                />
                <h3 className=" md:block font-medium text-xs md:text-base">
                  SOON
                </h3>
              </div>
              <input
                type="number"
                className="w-full text-sm outline-none md:text-base border bg-neutral-100 h-full px-3  md:p-4 rounded-md border-neutral-300"
                onBlur={() => setError("")}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full flex flex-col  items-center justify-center h-8 md:h-12 mt-6">
            {/* <SlArrowUp size={12} /> */}
            {/* <SlArrowDown size={12} /> */}
          </div>

          <p className="text-center mb-6 text-md md:text-md">
            Enter Your Mobile Money Number.
          </p>
          <div className="flex  flex-1 ">
            <div className="flex flex-row items-center w-full gap-4">
              <SelectCurrency
                setSelectedCurrency={setSelectedCurrency}
                setCode={setCode}
              />

              <input
                type="tel"
                className="w-full text-sm outline-none md:text-base border bg-neutral-100 h-full px-3  md:p-4 rounded-md border-neutral-300"
                placeholder="Enter your phone"
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => setError("")}
              />
            </div>
          </div>

          <div className="flex  flex-1 py-4">
            <input
              type="text"
               className="w-full text-sm outline-none md:text-base border bg-neutral-100 h-full px-3  md:p-4 rounded-md border-neutral-300"
                placeholder="Enter your Soon Wallet Address."
                onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>

          <ExchangeRates
            currency={selectedCurrency}
            token="SOON"
            amount={Number(amount)}
          />

          <button
            onClick={handleSubmit}
            type="submit"
            disabled={loading || !phone || Number(amount) <= 0}
            className={`w-full flex items-center justify-center p-3 md:p-4 ${
              loading || !phone || Number(amount) <= 0
                ? "bg-neutral-200"
                : "bg-black"
            }  text-sm md:text-base rounded-full text-white font-bold`}
          >
            {loading ? <Spinner /> : "Confirm"}
          </button>
          <div className="w-full flex items-center justify-center py-2 bg-white p-6 rounded-lg 
        shadow-lg hover:shadow-xl transition-shadow duration-300 border-t border-gray-300 mt-4 ">
        <Image className="rounded-md"
            priority
            src={soonToken}
            height={40}
            width={40}
            alt="By Soon on / offramp."
          />
        {/* b */}
        <p className="mr-1 font-light text-xs md:text-sm font-mono">If no response within 2 minutes, Reach <br />
         out on telegram <span className="text-xl font-bold bg-green-200 px-4 py-1 rounded-[5px]"> @kakoozavian </span></p>
       
      </div>
        </form>
        
      </Container>
      
      
    </div>
  );
}
