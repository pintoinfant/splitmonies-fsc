// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DAI is ERC20 {
    uint256 public initialSupply = 1000000000000000000 * 10**18; // 1 billion billion tokens

    constructor() ERC20("DAI", "DAI") {
        _mint(address(this), initialSupply);       
    }

    function faucet(address to, uint256 amount) external {
        _transfer(address(this), to, amount * 10**18);
    }
}