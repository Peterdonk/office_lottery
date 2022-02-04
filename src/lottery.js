import web3 from './web3';

const address = '0xE1E5501Ae2ad544332A8Ae36fb4C81D889689A9d';

const abi =
  [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
      constant: undefined,
      payable: undefined,
      signature: 'constructor'
    },
    {
      inputs: [],
      name: 'enterCompetition',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
      constant: undefined,
      payable: true,
      signature: '0xe6df48a5'
    },
    {
      inputs: [],
      name: 'getAllPlayers',
      outputs: [[Object]],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0xefa1c482'
    },
    {
      inputs: [],
      name: 'managersAddress',
      outputs: [[Object]],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0xf829a0eb'
    },
    {
      inputs: [[Object]],
      name: 'players',
      outputs: [[Object]],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0xf71d96cb'
    }
  ];

export default new web3.eth.Contract(abi, address);