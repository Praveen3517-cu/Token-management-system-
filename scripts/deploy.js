// scripts/deploy.js

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(1000000); // Initial supply of 1,000,000 tokens
  
    console.log("MyToken contract deployed to:", token.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  