import {ethers} from "ethers";

const addressETH = '0xfEe4D4F0aDFF8D84c12170306507554bC7045878';
const addressMATIC = '0xA3f32c8cd786dc089Bd1fC175F2707223aeE5d00';

const abi = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'string[]',
                name: 'keys',
                type: 'string[]',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'getData',
        outputs: [
            {
                internalType: 'address',
                name: 'resolver',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'string[]',
                name: 'values',
                type: 'string[]',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    }
];

const providerETH = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/eAgt2MT6ioSC8NeDFKg1Y1QuzrOBBxvz");
const providerMATIC = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/eAgt2MT6ioSC8NeDFKg1Y1QuzrOBBxvz");

const contractETH = new ethers.Contract(addressETH, abi, providerETH);
const contractMATIC = new ethers.Contract(addressMATIC, abi, providerMATIC);

export {contractETH, contractMATIC};