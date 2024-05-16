import React, { useState, useEffect } from "react";
import { getContract, getAccount } from "../utils/web3"; // Assuming you have a function to get the current user's Ethereum account
import { ethers } from "ethers";

const ShowTenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const contract = await getContract();
        const count = await contract.tenderCount();
        const tenderArray = [];
        for (let i = 1; i <= count; i++) {
          const tender = await contract.tenders(i);
          tenderArray.push(tender);
        }
        setTenders(tenderArray);
      } catch (error) {
        console.error("Error fetching tenders:", error);
      }
    };
    fetchTenders();
  }, []);

  const bidNow = async (tender) => {
    try {
      setLoading(true);
      const contract = await getContract();
      const account = await getAccount(); // Get the current user's Ethereum account
      const transaction = await contract.bid(tender.id, {
        value: tender.minimumBid,
      });
      await transaction.wait();
      setLoading(false);
    } catch (error) {
      console.error("Error bidding:", error);
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-gray-900 h-screen flex flex-wrap justify-center items-center">
      {tenders.map((tender) => (
        <div
          key={tender.id.toString()}
          className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-gray-800 dark:bg-gray-700 text-white"
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{tender.title}</div>
            <p className="text-gray-300 text-base">{tender.description}</p>
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-300">Issuer Name: {tender.name}</p>
            <p className="text-gray-300">
              Start Date:{" "}
              {new Date(parseInt(tender.date._hex, 16)).toLocaleString()}
            </p>
            <p className="text-gray-300">
              End Date:{" "}
              {new Date(
                parseInt(tender.deadlineDate._hex, 16)
              ).toLocaleString()}
            </p>
            <p className="text-gray-300">
              Lowest Bid (ETH):{" "}
              {tender.lowestBid._hex.substring(0, 6) +
                "......." +
                tender.lowestBid._hex.substring(6, 14)}
            </p>
            <p className="text-gray-300">
              Lowest Bidder:{" "}
              {tender.lowestBidder.substring(0, 6) +
                "......." +
                tender.lowestBid._hex.substring(6, 14)}
            </p>
          </div>
          <div className="px-6 py-4">
            <button
              disabled={loading}
              onClick={() => bidNow(tender)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? "Bidding..." : "Bid Now"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowTenders;
