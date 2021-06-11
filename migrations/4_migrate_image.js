const MyImage  = artifacts.require("./Image.sol");

module.exports = function(deployer) {
  deployer.deploy(MyImage);
};