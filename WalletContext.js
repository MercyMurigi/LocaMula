import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  // Replace with your contract ABI and address
  const contractABI = []; // Your contract ABI
  const contractAddress = "0xYourContractAddress";

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contractInstance);
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <WalletContext.Provider value={{ account, contract, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);