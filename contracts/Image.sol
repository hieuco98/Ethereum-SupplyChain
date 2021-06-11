pragma solidity ^0.5.0;

contract Image 
{
    string imageHash;
    function set(string memory _imageHash) public {
        imageHash = _imageHash;
    }
    function get() public view returns (string memory)
    {
        return imageHash;
    }
}