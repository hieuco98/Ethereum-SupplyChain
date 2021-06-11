require('dotenv').config();
const express= require('express')
const ipfsClient = require('ipfs-http-client');
const path1 = require('path');
const ipfs = ipfsClient('https://ipfs.infura.io:5001');
const app =express();
var formidable = require('formidable');
const Web3 = require('web3');
var fs = require('fs');
const mongodb = require('mongodb').MongoClient
const Provider = require('@truffle/hdwallet-provider');
//const contract = require('truffle-contract');
//const artifacts = require('./build/Inbox.json');
const MyImage = require('./build/contracts/Image.json')
const { globSource } = ipfsClient;
const address = '0x17dB1E91E589944663F7D96B4AA8270297C67858';
const privateKey = '0x69966ee82a73caae04e84e3bb9e708480894e36126f2855bbed14e679e4e6988';
const infuraUrl = 'https://rinkeby.infura.io/v3/ebc1d1a11f844388978cf96fb5f8173b'; 
app.use(express.json())
const provider = new Provider(privateKey,'https://rinkeby.infura.io/v3/ebc1d1a11f844388978cf96fb5f8173b' ); 
  const web3 = new Web3(provider);
console.log("Connection Successfull!");

app.listen(5000,function()
{
    console.log("Server is running in port 5000");
})
app.post("/upload",function(req,res)
{
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      var oldpath = files.filetoupload.path;
      var newpath = '/Users/macbook/Desktop/blockchain/upload/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        //if (err) throw err;
        // res.send('File uploaded and moved!');
        // res.end(); 
})
const fileAdded = await ipfs.add(globSource(`./upload/${files.filetoupload.name}`,{recursive: true }));
console.log(fileAdded);
const fileHash = fileAdded.cid;
console.log(fileHash);
const networkId =  await web3.eth.net.getId();
    const myImage = new web3.eth.Contract(
      MyImage.abi,
      MyImage.networks[networkId].address
    );
const receipt = await myImage.methods.set(fileHash).send({from: address});
console.log(`Transaction hash: ${receipt.transactionHash}`);
const imageHash = await myImage.methods.get();
console.log(imageHash);
res.send("Link lấy dữ liệu từ IPFS : " + `https://ipfs.infura.io/ipfs/${ fileHash }`);
})
})
app.get('/',(req,res)=>res.sendFile(path1.resolve(__dirname, './upload.html')));