const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GasDoSVulnerable - DoS via Gas", function () {
  let contract;
  let owner, users;

  beforeEach(async function () {
    [owner, ...users] = await ethers.getSigners();

    const GasDoS = await ethers.getContractFactory("GasDoSVulnerable");
    contract = await GasDoS.deploy();
    await contract.waitForDeployment();

    // Alimenter le contrat avec de l’ether
    await owner.sendTransaction({
      to: contract.target,
      value: ethers.parseEther("1"),
    });
  });

  it("Should fail when users list becomes too large (DoS)", async function () {
    // Ajouter beaucoup d’utilisateurs
    for (let i = 0; i < 500; i++) {
      await contract.addUser(users[i % users.length].address);
    }

    // Appel qui doit échouer à cause du gas
    await expect(
      contract.rewardAll({ gasLimit: 3_000_000 })
    ).to.be.reverted;
  });
});
