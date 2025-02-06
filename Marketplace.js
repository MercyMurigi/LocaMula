import React from "react";
import { useWallet } from "../context/WalletContext";

const Marketplace = ({ listings }) => {
  const { contract } = useWallet();

  const purchaseListing = async (id, price) => {
    if (contract) {
      const tx = await contract.purchaseListing(id, { value: ethers.utils.parseEther(price) });
      await tx.wait();
      alert("Purchase successful!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="border p-4 rounded-lg">
            <h3 className="font-bold">{listing.metadata}</h3>
            <p className="text-gray-600">Price: {ethers.utils.formatEther(listing.price)} ETH</p>
            <button
              onClick={() => purchaseListing(listing.id, listing.price)}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;