import { ethers } from 'ethers';
import { TenderABI } from '../../../artifacts/contracts/Tender.sol/TenderABI';

const getWeb3 = () => 
    new Promise(async (resolve, reject) => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                resolve(provider);
            } catch (error) {
                reject(error);
            }
        } else {
            reject('Install Metamask');
        }
    });

export const getContract = async () => {
    const provider = await getWeb3();
    const signer = provider.getSigner();
    const contract = new ethers.Contract('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', TenderABI, signer);
    return contract;
};

export const bid = async (contract, tenderId, amount) => {
    await contract.bid(tenderId, { value: amount });
};

export const getAccount = async () => {
    const provider = await getWeb3();
    const signer = provider.getSigner();
    return signer.getAddress();
};

export default getWeb3;