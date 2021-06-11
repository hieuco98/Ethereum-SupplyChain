const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('./build/contracts/MyContract.json');
const address = '0x17dB1E91E589944663F7D96B4AA8270297C67858';
const privateKey = '0x69966ee82a73caae04e84e3bb9e708480894e36126f2855bbed14e679e4e6988';
const infuraUrl = 'https://rinkeby.infura.io/v3/ebc1d1a11f844388978cf96fb5f8173b'; 
const init1 = async () => {
  const provider = new Provider(privateKey,'https://rinkeby.infura.io/v3/ebc1d1a11f844388978cf96fb5f8173b' ); 
  const web3 = new Web3(provider);
    const networkId =  await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
      MyContract.abi,
      MyContract.networks[networkId].address
    );
  
    const tx = myContract.methods.setData(2);
    const gas = await tx.estimateGas({from: address});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);
  
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: myContract.options.address, 
        data,
        gas,
        gasPrice,
        nonce, 
        chainId: networkId
      },
      privateKey
    );
    console.log(`Old data value: ${await myContract.methods.data().call()}`);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(`New data value: ${await myContract.methods.data().call()}`);
  }
  init1();