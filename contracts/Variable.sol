pragma solidity ^0.4.11;

contract Variable {
    uint value;

    event Value(uint _value);

    function Variable() {
        value = 0;
    }

    function () payable {
        value += msg.value;
        Value(value);
    }

    function setValue(uint _value) public returns(uint) {
        value = _value;
        Value(value);
        return value;
    }

    function addValue(uint _value) public returns(uint) {
        value += _value;
        Value(value);
        return value;
    }

    function mulValue(uint _value) public returns(uint) {
        value *= _value;
        Value(value);
        return value;
    }

    function getValue() public view returns(uint) {
        Value(value);
        return value;
    }
}
