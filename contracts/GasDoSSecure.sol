/// @title GasDoSSecure - Contrat sécurisé contre DoS via gas
/// @author Chaima
/// @notice Permet de traiter des utilisateurs par lots pour éviter un DoS
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract GasDoSSecure {
    /// @notice Liste des utilisateurs
    address[] public users;

    /// @notice Dernier utilisateur traité
    uint256 public lastProcessed;

    /// @notice Ajoute un utilisateur à la liste
    /// @param user Adresse de l'utilisateur à ajouter
    function addUser(address user) public {
        users.push(user);
    }

    /// @notice Traite un lot d'utilisateurs pour leur envoyer une récompense
    /// @param batchSize Nombre d'utilisateurs à traiter dans ce batch
    function processUsers(uint256 batchSize) public {
        uint256 end = lastProcessed + batchSize;
        if (end > users.length) {
            end = users.length;
        }

        for (uint256 i = lastProcessed; i < end; ++i) {
            payable(users[i]).transfer(0);
        }
        lastProcessed = end;
    }
}
