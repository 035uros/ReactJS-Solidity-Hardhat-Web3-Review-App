const { ethers } = require("hardhat");

describe("App", () => {
  let contract;

  before(async () => {
    const App = await ethers.getContractFactory("Complaint");
    contract = await App.deploy();
    await contract.deployed();
  });

  it("should add a complaint", async () => {
    const name = "John";
    const lastName = "Doe";
    const text = "Sample complaint text";
    const time = "2023-06-10 12:00:00";

    await contract.addComplaint(name, lastName, text, time);

    const users = await contract.getUsers();
    const user = users[0];

    assert.equal(user.name, name);
    assert.equal(user.lastName, lastName);
    assert.equal(user.text, text);
    assert.equal(user.time, time);
  });

  it("should obtain contract address", async () => {
    const contractAddress = contract.address;
    console.log("Contract Address:", contractAddress);
    assert(contractAddress, "Contract address should be obtained");
  });
});
