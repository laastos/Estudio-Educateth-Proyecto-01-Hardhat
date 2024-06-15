import { expect } from "chai";
import { log } from "console";
import hre from "hardhat";

describe("LAAB Token", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await hre.ethers.getSigners();

    const initialSupply = hre.ethers.parseUnits("1000000", 18);
    const Token = await hre.ethers.getContractFactory("LAAB");
    const token = await Token.deploy(initialSupply);

    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const [owner, addr1, addr2] = await hre.ethers.getSigners();

    const initialSupply = hre.ethers.parseUnits("1000000", 18);
    const Token = await hre.ethers.getContractFactory("LAAB");
    const token = await Token.deploy(initialSupply);

    // Transfer 50 tokens from owner to addr1
    await token.transfer(addr1.address, hre.ethers.parseUnits("50", 18));
    expect(await token.balanceOf(addr1.address)).to.equal(hre.ethers.parseUnits("50", 18));

    // Transfer 50 tokens from addr1 to addr2
    await token.connect(addr1).transfer(addr2.address, hre.ethers.parseUnits("50", 18));
    expect(await token.balanceOf(addr2.address)).to.equal(hre.ethers.parseUnits("50", 18));
    expect(await token.balanceOf(addr1.address)).to.equal(0);
  });

  it("Should fail if sender doesn’t have enough tokens", async function () {
    const [owner, addr1] = await hre.ethers.getSigners();

    const initialSupply = hre.ethers.parseUnits("1000000", 18);
    const Token = await hre.ethers.getContractFactory("LAAB");
    const token = await Token.deploy(initialSupply);

    const initialOwnerBalance = await token.balanceOf(owner.address);

    // Try to send 1 token from addr1 (0 tokens) to owner (should fail)
    await expect(
      token.connect(addr1).transfer(owner.address, hre.ethers.parseUnits("1", 18))
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

    // Owner balance shouldn't have changed.
    expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
  });
});