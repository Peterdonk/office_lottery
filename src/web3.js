import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';

const provider = await detectEthereumProvider()
const web3 = new Web3(provider);

export default web3;