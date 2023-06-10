// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Complaint {

    struct User {
        uint id;
        string name;
        string lastname;
        string text;
        address currentHolder;
        string time;
    }

    User[] public users;

    event NewComplaint(uint id, string name, string lastname, string text);

    function addComplaint(string memory _name, string memory _lastname, string memory _text, string memory _time) public {
        uint id = users.length;
        users.push(User(id, _name, _lastname, _text, address(0), _time));
        emit NewComplaint(id, _name, _lastname, _text);
    }

     function getUsers() public view returns (User[] memory) {
        return users;
    }


}