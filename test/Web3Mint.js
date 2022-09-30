const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Web3Mint", () => {
	it("Should return the nft", async () => {
		const Mint = await ethers.getContractFactory("Web3Mint");
		const mintContract = await Mint.deploy();
		await mintContract.deployed();
		const [owner, addr1] = await ethers.getSigners();

		await mintContract
			.connect(owner)
			.mintIpfsNFT("poker", "bafkreievxssucnete4vpthh3klylkv2ctll2sk2ib24jvgozyg62zdtm2y"); //0
		await mintContract
			.connect(addr1)
			.mintIpfsNFT("poker1", "bafkreievxssucnete4vpthh3klylkv2ctll2sk2ib24jvgozyg62zdtm2y"); //1
		console.log(await mintContract.tokenURI(0));
		console.log(await mintContract.tokenURI(1));

		const token0 = await mintContract.tokenURI(0);
		const b64result = token0.split(",")[1];
		console.log(b64result);
		const strresult = Buffer.from(b64result, "base64").toString();
		const jsonresult = JSON.parse(strresult);
		console.log(jsonresult);
        expect(jsonresult.name).to.equal("poker -- NFT #: 0");
        expect(jsonresult.description).to.equal("An epic NFT");

		// expect(token0)
	});
});
