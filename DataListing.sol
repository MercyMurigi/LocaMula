// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataListing {
    // Struct to represent a data listing
    struct Listing {
        uint256 id; // Unique identifier for the listing
        address payable provider; // Address of the data provider
        string metadata; // Metadata about the location data (e.g., geolocation, timestamp)
        string dataHash; // Hash of the data stored off-chain (e.g., IPFS hash)
        uint256 price; // Price of the data in Ether
        bool isSold; // Whether the data has been sold
    }

    // State variables
    uint256 public listingCount; // Total number of listings
    mapping(uint256 => Listing) public listings; // Mapping of listing ID to Listing struct

    // Events
    event ListingCreated(uint256 id, address provider, string metadata, string dataHash, uint256 price);
    event DataPurchased(uint256 id, address buyer, uint256 price);
    event FundsWithdrawn(address provider, uint256 amount);

    // Modifier to check if a listing exists
    modifier listingExists(uint256 id) {
        require(listings[id].provider != address(0), "Listing does not exist");
        _;
    }

    // Function to create a new listing
    function createListing(string memory metadata, string memory dataHash, uint256 price) public {
        listingCount++;
        listings[listingCount] = Listing({
            id: listingCount,
            provider: payable(msg.sender),
            metadata: metadata,
            dataHash: dataHash,
            price: price,
            isSold: false
        });
        emit ListingCreated(listingCount, msg.sender, metadata, dataHash, price);
    }

    // Function to purchase a listing
    function purchaseListing(uint256 id) public payable listingExists(id) {
        Listing storage listing = listings[id];
        require(!listing.isSold, "Listing already sold");
        require(msg.value >= listing.price, "Insufficient payment");

        // Mark the listing as sold
        listing.isSold = true;

        // Transfer funds to the provider
        listing.provider.transfer(msg.value);

        // Emit purchase event
        emit DataPurchased(id, msg.sender, msg.value);
    }

    // Function for providers to withdraw their earnings
    function withdrawFunds() public {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        // Transfer funds to the provider
        payable(msg.sender).transfer(balance);

        // Emit withdrawal event
        emit FundsWithdrawn(msg.sender, balance);
    }

    // Function to get details of a listing
    function getListing(uint256 id) public view listingExists(id) returns (
        uint256, address, string memory, string memory, uint256, bool
    ) {
        Listing memory listing = listings[id];
        return (
            listing.id,
            listing.provider,
            listing.metadata,
            listing.dataHash,
            listing.price,
            listing.isSold
        );
    }
}