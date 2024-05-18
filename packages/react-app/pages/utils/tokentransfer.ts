import { createPublicClient, createWalletClient, custom, http } from "viem";
// import { celo } from 'viem/chains'
import { celoAlfajores } from "viem/chains";

const client = createWalletClient({
  chain: celoAlfajores,
  // chain: celo,
  transport: custom(window.ethereum!),
});

const publicClient = createPublicClient({
  chain: celoAlfajores,
  // chain: celo,
  transport: http(),
});

export async function requestTransfer(
  tokenAddress,
  transferValue,
  tokenDecimals
) {
  let hash = await client.sendTransaction({
    to: tokenAddress,
    // to: '0x765DE816845861e75A25fCA122bb6898B8B1282a' // cUSD (Mainnet)
    // to: '0xcebA9300f2b948710d2653dD7B07f33A8B32118C' // USDC (Mainnet)
    // to: '0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e' // USDT (Mainnet)
    data: encodeFunctionData({
      abi: stableTokenAbi, // Token ABI can be fetched from Explorer.
      functionName: "transfer",
      args: [
        receiverAddress,
        // Different tokens can have different decimals, cUSD (18), USDC (6)
        parseUnits(`${Number(transferValue)}`, tokenDecimals),
      ],
    }),
    // If the wallet is connected to a different network then you get an error.
    chain: celoAlfajores,
    // chain: celo,
  });

  const transaction = await publicClient.waitForTransactionReceipt({
    hash, // Transaction hash that can be used to search transaction on the explorer.
  });

  if (transaction.status === "success") {
    // Do something after transaction is successful.
  } else {
    // Do something after transaction has failed.
  }
}
