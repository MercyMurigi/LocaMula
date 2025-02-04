// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Reputation {
    // Struct to represent a provider's reputation
    struct ProviderReputation {
        uint256 totalRating; // Sum of all ratings
        uint256 ratingCount; // Number of ratings
    }

    // State variables
    mapping(address => ProviderReputation) public providerReputations; // Mapping of provider address to reputation data

    // Events
    event ProviderRated(address indexed provider, uint256 rating, uint256 averageRating);

    // Function to rate a provider
    function rateProvider(address provider, uint256 rating) public {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");

        // Update the provider's reputation
        ProviderReputation storage reputation = providerReputations[provider];
        reputation.totalRating += rating;
        reputation.ratingCount++;

        // Calculate the average rating
        uint256 averageRating = reputation.totalRating / reputation.ratingCount;

        // Emit rating event
        emit ProviderRated(provider, rating, averageRating);
    }

    // Function to get a provider's reputation
    function getReputation(address provider) public view returns (uint256 totalRating, uint256 ratingCount, uint256 averageRating) {
        ProviderReputation memory reputation = providerReputations[provider];
        averageRating = reputation.ratingCount > 0 ? reputation.totalRating / reputation.ratingCount : 0;
        return (reputation.totalRating, reputation.ratingCount, averageRating);
    }
}