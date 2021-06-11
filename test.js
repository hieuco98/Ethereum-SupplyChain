const Web3 = require("web3");
const ethNetwork = 'https://rinkeby.infura.io/v3/ebc1d1a11f844388978cf96fb5f8173b';
const test = async () =>
{
    const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
    console.log("Connection Successfull!");
    // console.log("Latest Block Number: ");
    // web3.eth.getBlockNumber().then(console.log);
    // var findAccount=  await web3.eth.accounts.privateKeyToAccount('0x69966ee82a73caae04e84e3bb9e708480894e36126f2855bbed14e679e4e6988');
    // console.log("Account have this private key is: ");
    // console.log(findAccount);
    var hashMessage = web3.eth.accounts.hashMessage("Hello World");
    console.log(hashMessage);
    var newAccount = web3.eth.accounts.create();
    console.log(newAccount);
    var listAccount = web3.eth.accounts;
    console.log(listAccount);
    //  web3.eth.getAccounts(console.log);
    var balance = await web3.eth.getBalance("0x17dB1E91E589944663F7D96B4AA8270297C67858")
    console.log("Tai khoan co : ")
    console.log(balance);

}
test();