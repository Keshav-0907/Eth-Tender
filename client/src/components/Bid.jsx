import React, { useState } from 'react';
import { getContract } from '../utils/web3';

const Bid = () => {
    const [tenderId, setTenderId] = useState('');
    const [bidAmount, setBidAmount] = useState('');

    const placeBid = async () => {
        const contract = await getContract();
        await contract.bid(tenderId, { value: ethers.utils.parseEther(bidAmount) });
    };

    return (
        <div>
            <div>Bid for Tender</div>
            <input
                type="text"
                value={tenderId}
                onChange={(e) => setTenderId(e.target.value)}
                placeholder="Tender ID"
            />
            <input
                type="text"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Bid Amount (ETH)"
            />
            <button onClick={placeBid}>Place Bid</button>
        </div>
    );
};

export default Bid;
