// Ensure Web3 is initialized
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
  window.web3 = new Web3(window.ethereum);
  ethereum.request({ method: 'eth_requestAccounts' });
} else {
  alert('Please install MetaMask to use this DApp!');
}

// Replace with your deployed contract address and ABI
const contractAddress = '0x1b8AF22175D46523bdB0812263C9799f3ACBe025';
const contractABI = [
  // Your contract ABI here
];
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function mintTokens() {
  const mintAddress = document.getElementById('mintAddress').value;
  const mintAmount = document.getElementById('mintAmount').value;
  
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  contract.methods.mint(mintAddress, mintAmount).send({ from: account })
      .on('receipt', function(receipt) {
          console.log('Tokens minted successfully', receipt);
          document.getElementById('status').innerText = 'Tokens minted successfully!';
      })
      .on('error', function(error) {
          console.error('Error minting tokens', error);
          document.getElementById('status').innerText = 'Error minting tokens.';
      });
}

async function transferTokens() {
  const transferAddress = document.getElementById('transferAddress').value;
  const transferAmount = document.getElementById('transferAmount').value;
  
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  contract.methods.transfer(transferAddress, transferAmount).send({ from: account })
      .on('receipt', function(receipt) {
          console.log('Tokens transferred successfully', receipt);
          document.getElementById('status').innerText = 'Tokens transferred successfully!';
      })
      .on('error', function(error) {
          console.error('Error transferring tokens', error);
          document.getElementById('status').innerText = 'Error transferring tokens.';
      });
}

async function burnTokens() {
  const burnAmount = document.getElementById('burnAmount').value;
  
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  contract.methods.burn(burnAmount).send({ from: account })
      .on('receipt', function(receipt) {
          console.log('Tokens burned successfully', receipt);
          document.getElementById('status').innerText = 'Tokens burned successfully!';
      })
      .on('error', function(error) {
          console.error('Error burning tokens', error);
          document.getElementById('status').innerText = 'Error burning tokens.';
      });
}

async function checkBalance() {
  const balanceAddress = document.getElementById('balanceAddress').value;
  
  contract.methods.balanceOf(balanceAddress).call()
      .then(function(balance) {
          console.log('Balance:', balance);
          document.getElementById('status').innerText = `Balance: ${balance}`;
      })
      .catch(function(error) {
          console.error('Error checking balance', error);
          document.getElementById('status').innerText = 'Error checking balance.';
      });
}

// Event listeners for buttons
document.getElementById('mintButton').addEventListener('click', mintTokens);
document.getElementById('transferButton').addEventListener('click', transferTokens);
document.getElementById('burnButton').addEventListener('click', burnTokens);
document.getElementById('checkBalanceButton').addEventListener('click', checkBalance);

// Function to dynamically create a card for the contract interaction
function createCard() {
  const container = document.getElementById('contractCard');
  
  if (container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h3>Token Management</h3>
        </div>
        <div class="card-body">
          <label for="mintAddress">Mint Address:</label>
          <input type="text" id="mintAddress" placeholder="Enter address">
          <label for="mintAmount">Mint Amount:</label>
          <input type="number" id="mintAmount" placeholder="Enter amount">
          <button id="mintButton">Mint Tokens</button>
          <br><br>
          <label for="transferAddress">Transfer Address:</label>
          <input type="text" id="transferAddress" placeholder="Enter address">
          <label for="transferAmount">Transfer Amount:</label>
          <input type="number" id="transferAmount" placeholder="Enter amount">
          <button id="transferButton">Transfer Tokens</button>
          <br><br>
          <label for="burnAmount">Burn Amount:</label>
          <input type="number" id="burnAmount" placeholder="Enter amount">
          <button id="burnButton">Burn Tokens</button>
          <br><br>
          <label for="balanceAddress">Check Balance Address:</label>
          <input type="text" id="balanceAddress" placeholder="Enter address">
          <button id="checkBalanceButton">Check Balance</button>
          <br><br>
          <div id="status"></div>
        </div>
      </div>
    `;
  }
}