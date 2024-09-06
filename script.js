const fs = require('fs');
const path = require('path');

const artifact = JSON.parse(fs.readFileSync(path.join(__dirname, 'artifacts/contracts/MyToken.sol/MyToken.json'), 'utf8'));
console.log(JSON.stringify(artifact.abi, null, 2));
