require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

const privateKey = '127ed4da778d93b9531dab1066c69973532944846988b56e3662060bf61a867d'; // Replace with your actual private key
const infuraProjectId = 'YOUR_INFURA_PROJECT_ID'; // Replace with your Infura Project ID

module.exports = {
  solidity: "0.8.20",
  networks: {
    amoy: {
      url: `https://rpc-amoy.polygon.technology`,
      accounts: ['127ed4da778d93b9531dab1066c69973532944846988b56e3662060bf61a867d'],
      chainId: 80002, // Replace with the actual chain ID for Amoy
    },
  },
  etherscan: {
    // Your etherscan API key (if you need to verify contracts)
    //apiKey: 'YOUR_ETHERSCAN_API_KEY'
  }
};
