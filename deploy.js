const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // http://0.0.0.0:7545
  const provider = new ethers.providers.JsonRpcProvider("http://192.168.1.113:7545");
  const wallet = new ethers.Wallet(
    "b6644c3e4616745ca494c5e331211aa8c948be0f5e482519590f24cc1e2f7792",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait !");
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
