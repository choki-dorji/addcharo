// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.13;

contract Lock {
    struct User {
        string Name;
        friend [] Friends;
    }
    struct friend {
        address pubkey;
        string Name;
    }
    struct message {
        address sender;
        uint timeStamp;
        string message; 
    }
    struct AllUsersStruck {
        string Name;
        address accountAddress;
    }
    AllUsersStruck[] getAllUsers;
    mapping(address => User) users;
    mapping(bytes32 => message[]) allMessages;
    event LogMessage(string message, address sender);


    function checkUserExist(address pubkey) public view returns (bool) {
        return bytes(users[pubkey].Name).length > 0;
    }
    function createAccount(address pubkey, string memory name) public  {
        require(!checkUserExist(pubkey), "User already exist");
        require(bytes(name).length > 0, "Name cannot be empty");
        users[pubkey].Name = name;
        getAllUsers.push(AllUsersStruck(name, msg.sender));
    }
    function getUserName(address pubkey) public view returns (string memory) {
        require(checkUserExist(pubkey), "User is not registered");
        return users[pubkey].Name;
    }
    function addFriend(address friend_pubkey, string memory name) public {
        require(checkUserExist(msg.sender), "you are not registered");
        require(checkUserExist(friend_pubkey), "User is not registered");
        require(msg.sender != friend_pubkey, "you can't add yourself");
        require(!checkAlreadyFriends(msg.sender, friend_pubkey), "Already friends");

        _addFriend(msg.sender, friend_pubkey, name);
        _addFriend(friend_pubkey, msg.sender, users[msg.sender].Name);
    }

    function checkAlreadyFriends(address pubkey1, address pubkey2) public view returns (bool) {
        if(users[pubkey1].Friends.length > users[pubkey2].Friends.length) {
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }
        for (uint i = 0; i < users[pubkey1].Friends.length ; i++) {
            if (users[pubkey1].Friends[i].pubkey == pubkey2) {
                return true;
            }
        }
        return false;
    }
    function login(string memory name, address pubkey) public view returns (bool success, User memory user) {
        require(checkUserExist(pubkey), "User is not registered");
        require(keccak256(bytes(name)) == keccak256(bytes(users[pubkey].Name)), "Invalid name");
        success = true;
        user = users[pubkey];
    }
    function _addFriend(address me, address firend_key, string memory name) internal {
        friend memory newFriend = friend(firend_key, name);
        users[me].Friends.push(newFriend);
    }
    function getMyfriends() external view returns (friend[] memory) {
        return users[msg.sender].Friends;
    }
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns (bytes32) {
        if(pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        }else {
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }
    function sendMessage(address friend_key, string memory _msg) public {
        require(checkUserExist(msg.sender), "you are not registered");
        require(checkUserExist(friend_key), "User is not registered");
        require(checkAlreadyFriends(msg.sender, friend_key), "Not friends");
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMessage = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMessage);
    }
    function readMessage(address friend_key) external view returns(message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }
    function getAllAppUSers() public view returns (AllUsersStruck[] memory) {
        return getAllUsers;
    }
}

// it is just mu solidity code the main was in the testnet.ftmscan network with the given address
