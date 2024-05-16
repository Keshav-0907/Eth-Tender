async function main() {
    try {
        const Tender = await ethers.getContractFactory("Tender");
        console.log("Contract Factory created successfully");
        const tender = await Tender.deploy();
        console.log("Contract deployed successfully");
        await tender.deployed();
        console.log("Contract deployed at address:", tender.address);
    } catch (error) {
        console.error("Error deploying contract:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error("Error running deployment script:", error);
        process.exit(1);
    });
