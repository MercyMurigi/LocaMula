import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";

const ListingForm = () => {
  const { contract } = useWallet();
  const [metadata, setMetadata] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      const tx = await contract.createListing(metadata, ethers.utils.parseEther(price));
      await tx.wait();
      alert("Listing created successfully!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">Create Listing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Metadata"
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="number"
          placeholder="Price (ETH)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default ListingForm;