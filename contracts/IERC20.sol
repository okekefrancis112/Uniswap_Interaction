// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IERC20 {
    function approve(address _spender, uint _value) external;

    function balanceOf(address who) external view returns (uint256 balance);
}

// https://rinkeby.etherscan.io/address/0x5c37060bb0A63a775E256dBf75c57524f0F573c4#code
