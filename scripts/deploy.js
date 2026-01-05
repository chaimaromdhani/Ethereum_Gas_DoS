async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Déploiement depuis le compte:", deployer.address);

  // GasDoSVulnerable
  const GasDoSVulnerable = await ethers.getContractFactory("GasDoSVulnerable");
  const gasDoSVulnerable = await GasDoSVulnerable.deploy();
  console.log("GasDoSVulnerable déployé à:", gasDoSVulnerable.address);

  // GasDoSSecure
  const GasDoSSecure = await ethers.getContractFactory("GasDoSSecure");
  const gasDoSSecure = await GasDoSSecure.deploy();
  console.log("GasDoSSecure déployé à:", gasDoSSecure.address);

  // Lock (exemple 1 ETH)
  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy({ value: ethers.parseEther("1") });
  console.log("Lock déployé à:", lock.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
