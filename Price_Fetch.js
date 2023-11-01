let {abi:Quoter_ABI} = require( '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json');
const { ethers } = require('ethers');

let provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/lU2_kD0On7bc7fyV5h6gwgWjbR8ldfcU") // Alchemy Ethereum Mainnet

let from_address="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";//WETH token address
let to_address ="0x6B175474E89094C44Da98b954EedeAC495271d0F";//DAI token address
let QUOTER_CONTRACT_ADDRESS = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
let decimal_1,decimal_2 = 18;  // functionality pending : its better to define function to find the decimals of token1,token2

let i = "19" // 19 WETH

let Price_Fetch= async()=>
{
    let amountIn =ethers.utils.parseUnits(i,decimal_1).toString(); // convert into wei wrt decimal places (18 by default in ERC20)

    const quoterContract =  new ethers.Contract(QUOTER_CONTRACT_ADDRESS,Quoter_ABI,provider)
    const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(from_address, to_address,3000, amountIn,0)
    
    let human_format = ethers.utils.formatUnits(quotedAmountOut.toString(),decimal_2) // read smart contract -> found -> real value at index 1

    console.log(i,"WETH =",human_format,"DAI");
}
Price_Fetch();