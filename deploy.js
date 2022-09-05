const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  // http://127.0.0.1:8545
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait !");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1); // const transactionReceipt =

  /*console.log("Here is the deployment transaction: ");
  console.log(contract.deployTransaction);
  console.log("Here is the transaction receipt: ");
  console.log(transactionReceipt);*/

  /*
  const nonce = await wallet.getTransactionCount();

  const tx = {
    nonce: nonce,
    gasPrice: 20000000000,
    gasLimit: 1000000,
    to: null,
    value: 0,
    data: "0x608060405234801561001057600080fd5b506107a7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806306c62c2c146100675780632e64cec1146100975780636057361d146100b55780636f760f41146100d15780639e7a13ad146100ed578063a7a0d5371461011e575b600080fd5b610081600480360381019061007c91906103fe565b610128565b60405161008e9190610560565b60405180910390f35b61009f610156565b6040516100ac9190610560565b60405180910390f35b6100cf60048036038101906100ca91906104a3565b61015f565b005b6100eb60048036038101906100e69190610447565b61017a565b005b610107600480360381019061010291906104a3565b610210565b60405161011592919061057b565b60405180910390f35b6101266102cc565b005b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b60008054905090565b806000819055506005600181905550610176610156565b5050565b6000604051806040016040528083815260200184815250905060038190806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101e59291906102d6565b505050816002846040516101f99190610549565b908152602001604051809103902081905550505050565b6003818154811061022057600080fd5b906000526020600020906002020160009150905080600001549080600101805461024990610674565b80601f016020809104026020016040519081016040528092919081815260200182805461027590610674565b80156102c25780601f10610297576101008083540402835291602001916102c2565b820191906000526020600020905b8154815290600101906020018083116102a557829003601f168201915b5050505050905082565b6006600181905550565b8280546102e290610674565b90600052602060002090601f016020900481019282610304576000855561034b565b82601f1061031d57805160ff191683800117855561034b565b8280016001018555821561034b579182015b8281111561034a57825182559160200191906001019061032f565b5b509050610358919061035c565b5090565b5b8082111561037557600081600090555060010161035d565b5090565b600061038c610387846105d0565b6105ab565b9050828152602081018484840111156103a8576103a761073a565b5b6103b3848285610632565b509392505050565b600082601f8301126103d0576103cf610735565b5b81356103e0848260208601610379565b91505092915050565b6000813590506103f88161075a565b92915050565b60006020828403121561041457610413610744565b5b600082013567ffffffffffffffff8111156104325761043161073f565b5b61043e848285016103bb565b91505092915050565b6000806040838503121561045e5761045d610744565b5b600083013567ffffffffffffffff81111561047c5761047b61073f565b5b610488858286016103bb565b9250506020610499858286016103e9565b9150509250929050565b6000602082840312156104b9576104b8610744565b5b60006104c7848285016103e9565b91505092915050565b60006104db82610601565b6104e5818561060c565b93506104f5818560208601610641565b6104fe81610749565b840191505092915050565b600061051482610601565b61051e818561061d565b935061052e818560208601610641565b80840191505092915050565b61054381610628565b82525050565b60006105558284610509565b915081905092915050565b6000602082019050610575600083018461053a565b92915050565b6000604082019050610590600083018561053a565b81810360208301526105a281846104d0565b90509392505050565b60006105b56105c6565b90506105c182826106a6565b919050565b6000604051905090565b600067ffffffffffffffff8211156105eb576105ea610706565b5b6105f482610749565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561065f578082015181840152602081019050610644565b8381111561066e576000848401525b50505050565b6000600282049050600182168061068c57607f821691505b602082108114156106a05761069f6106d7565b5b50919050565b6106af82610749565b810181811067ffffffffffffffff821117156106ce576106cd610706565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61076381610628565b811461076e57600080fd5b5056fea2646970667358221220c2ae83991b82b79cb40c414b2f614a40a2b70514ddc7b2fea61f60b59ff72c2064736f6c63430008070033",
    chainId: 1337,
  };
  const sentTxResponse = await wallet.sendTransaction(tx);
  await sentTxResponse.wait(1);
  console.log(sentTxResponse);*/

  const currentFavNum = await contract.retrieve();
  console.log(`Current Fav Num: ${currentFavNum.toString()}`);
  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);
  const updateFavNum = await contract.retrieve();
  console.log(`Updated Fav Num: ${updateFavNum.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
