const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GasDoSSecure - Protection contre DoS", function () {
  it("Should process users in batches without gas DoS", async function () {
    const [owner, ...accounts] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("GasDoSSecure");
    const contract = await Contract.deploy();
    await contract.waitForDeployment();

    // Ajouter 100 utilisateurs
    for (let i = 0; i < 100; i++) {
      await contract.addUser(accounts[i % accounts.length].address);
    }

    // Traitement par batch
    await contract.processUsers(20);
    await contract.processUsers(20);
    await contract.processUsers(20);
    await contract.processUsers(20);
    await contract.processUsers(20);

    // Vérification finale
    expect(await contract.lastProcessed()).to.equal(100);
  });
});
