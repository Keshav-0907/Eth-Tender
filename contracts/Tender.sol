// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tender {
    struct TenderDetail {
        uint id;
        string name;
        string title; // Title of the tender
        string description; // Description of the tender
        uint minimumBid;
        uint lowestBid;
        address lowestBidder;
        bool exists;
        uint date;
        uint deadlineDate; // Deadline for bidding (Unix timestamp)
    }

    uint public tenderCount = 0;
    mapping(uint => TenderDetail) public tenders;
    mapping(uint => mapping(address => uint)) public bids;

    function createTender(string memory _name, string memory _title, string memory _description, uint _minimumBid, uint _date, uint _deadlineDate) public {
        tenderCount++;
        tenders[tenderCount] = TenderDetail(tenderCount, _name, _title, _description, _minimumBid, type(uint).max, address(0), true, _date, _deadlineDate);
    }

    function bid(uint _tenderId) public payable {
        require(tenders[_tenderId].exists, "Tender does not exist");
        require(block.timestamp < tenders[_tenderId].deadlineDate, "Bidding period has ended");
        require(msg.value >= tenders[_tenderId].minimumBid, "Bid amount is less than minimum bid");
        require(msg.value < tenders[_tenderId].lowestBid || tenders[_tenderId].lowestBidder == address(0), "There already is a lower or equal bid");

        if (tenders[_tenderId].lowestBidder != address(0)) {
            // Refund the previous lowest bidder
            payable(tenders[_tenderId].lowestBidder).transfer(tenders[_tenderId].lowestBid);
        }

        tenders[_tenderId].lowestBid = msg.value;
        tenders[_tenderId].lowestBidder = msg.sender;
        bids[_tenderId][msg.sender] = msg.value;
    }

    function determineWinningBid(uint _tenderId) public view returns (address, uint) {
        require(tenders[_tenderId].exists, "Tender does not exist");
        require(block.timestamp >= tenders[_tenderId].deadlineDate, "Bidding period has not ended yet");

        return (tenders[_tenderId].lowestBidder, tenders[_tenderId].lowestBid);
    }
}
