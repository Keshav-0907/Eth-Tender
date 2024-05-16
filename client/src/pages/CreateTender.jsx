import React, { useState } from "react";
import { getContract } from "../utils/web3";

const CreateTender = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minimumBid, setMinimumBid] = useState("");
  const [date, setDate] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");

  const handleCreateTender = async () => {
    if (!name || !title || !description || !minimumBid || !date || !deadlineDate) {
      console.error("Please fill in all fields");
      return;
    }
    console.log(name, title, description, minimumBid, date, deadlineDate);
    const contract = await getContract();
    await contract.createTender(
      name,
      title,
      description,
      minimumBid,
      Math.floor(new Date(date).getTime() / 1000),
      Math.floor(new Date(deadlineDate).getTime() / 1000)
    );
    console.log("Tender created");
  };

  return (
    <div className="bg-gray-800 p-4 flex w-screen items-center justify-around h-screen flex-col">
      <div className="flex flex-col gap-10 text-center text-white">
        <div className="flex gap-10">
          <button className="bg-gray-700 p-2 rounded-md">
            {" "}
            <a href="/">Home</a>{" "}
          </button>
          <button className="bg-gray-700 p-2 rounded-md">
            {" "}
            View All Tenders{" "}
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-white text-xl mb-4">Create Tender</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tender Name"
          className="bg-gray-700 text-white px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="bg-gray-700 text-white px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="bg-gray-700 text-white px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={minimumBid}
          onChange={(e) => setMinimumBid(e.target.value)}
          placeholder="Minimum Bid"
          className="bg-gray-700 text-white px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          className="bg-gray-700 text-white px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={deadlineDate}
          onChange={(e) => setDeadlineDate(e.target.value)}
          placeholder="Deadline Date"
          className="bg-gray-700 text-white px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreateTender}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTender;
