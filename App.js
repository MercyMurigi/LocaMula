import React, { useState } from "react";
import { useWallet } from "./context/WalletContext";
import ListingForm from "./components/ListingForm";
import Marketplace from "./components/Marketplace";

const App = () => {
  const { account, connectWallet } = useWallet();
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    if (contract) {
      const listings = await contract.getListings();
      setListings(listings);
    }
  };

  useEffect(() => {
    if (account) {
      fetchListings();
    }
  }, [account]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">LocaMula</h1>
          {account ? (
            <span>Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
          ) : (
            <button onClick={connectWallet} className="bg-white text-blue-600 px-4 py-2 rounded">
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      <div className="container mx-auto mt-8">
        <ListingForm />
        <Marketplace listings={listings} />
      </div>
    </div>
  );
};

export default App;