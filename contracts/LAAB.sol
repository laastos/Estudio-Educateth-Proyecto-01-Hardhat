// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LAAB is ERC20 {
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;

    event mintToken(address indexed to, uint256 value);

    constructor(uint256 _initialSupply) ERC20("LAAB", "LAAB") {
        _mint(msg.sender, _initialSupply);
        balances[msg.sender] += _initialSupply;
    }

    /**
     * @dev Returns the balance of the account
     * @param _account The address of the account
     */
    function balanceOf(address _account) public view override returns (uint256) {
        return balances[_account];
    }

    /**
     * @dev Mints tokens to an address
     * @param _to    The address to mint to
     * @param _value The amount to mint
     */
    function mint(address _to, uint256 _value) public returns (bool) {
        _mint(_to, _value);
        balances[_to] += _value;

        emit mintToken(_to, _value);

        return true;
    }

    /**
     * @dev Transfer tokens from one address to another
     * @param _to    The address to transfer to
     * @param _value The amount to be transferred
     */
    function transfer(address _to, uint256 _value) public override returns (bool) {
        require(0 < _value, "ERC20: invalid amount to transfer");
        require(balances[msg.sender] >= _value, "ERC20: transfer amount exceeds balance");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    /**
     * @dev Allows another contract to spend some tokens on your behalf
     * @param _spender The address which will spend the funds
     * @param _value   The amount of tokens to be spent
     */
    function approve(address _spender, uint256 _value) public override returns (bool) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /**
     * @dev Allows another contract to spend some tokens on your behalf and then execute a function
     * @param _owner   The address of the owner
     * @param _spender The address of the spender
     */
    function allowance(address _owner, address _spender) public view override returns (uint256) {
        return allowed[_owner][_spender];
    }
}