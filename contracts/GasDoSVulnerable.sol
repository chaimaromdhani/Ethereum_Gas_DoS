// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GasDoSVulnerable {
    address[] public users;

    // Ajouter un utilisateur
    function addUser(address _user) external {
        users.push(_user);
    }

    // Fonction vulnérable : boucle non bornée
    function rewardAll() external {
        for (uint i = 0; i < users.length; i++) {
            payable(users[i]).transfer(1 wei);
        }
    }

    // Permet de recevoir de l’ether
    receive() external payable {}
}
