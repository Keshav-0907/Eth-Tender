import React, { useState, useEffect } from "react";
import getWeb3 from "../utils/web3";
import { ethers } from "ethers";

const Home = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAccountInfo = async () => {
      try {
        const provider = await getWeb3();
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const balance = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getAccountInfo();
  }, []);

  return (
    <div className="bg-gray-900 h-screen text-white flex justify-center items-center">
      {loading ? (
        <div className="bg-gray-700 px-4 py-2 cursor-pointer rounded-xl animate-pulse">
          Connecting...
        </div>
      ) : null}

      {account && balance && !loading && (
        <div className="flex flex-col justify-center gap-10">
          <div className="text-center">
            <div>Account Address: {account}</div>
            <div>Account Balance: {balance} ETH</div>
          </div>
          <div className="flex justify-center gap-10">
            <div className="flex gap-10">
              <button className="bg-gray-700 p-2 rounded-md">
                {" "}
                <a href="/create">Create Tender</a>{" "}
              </button>
              <button className="bg-gray-700 p-2 rounded-md">
                {" "}
                <a href="/show">View All Tenders</a>{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

{
  /* <div className="flex flex-col gap-10 text-center">
        <div>Hey 0x3456,</div>
        <div className="flex gap-10">
          <button className="bg-gray-700 p-2 rounded-md">
            {" "}
            <a href="/create">Create Tender</a>{" "}
          </button>
          <button className="bg-gray-700 p-2 rounded-md">
            {" "}
            View All Tenders{" "}
          </button>
        </div>
      </div> */
}
