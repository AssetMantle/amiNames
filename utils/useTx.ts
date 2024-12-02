import { defaultChainDenom, rpc } from "@/constant";
import { getSigningAssetmantleClient } from "@assetmantle/mantlejs";
import {
  DeliverTxResponse,
  isDeliverTxSuccess,
  StdFee,
} from "@cosmjs/stargate";
import { useChain } from "@cosmos-kit/react";
import BigNumber from "bignumber.js";
import { defaultChainName } from "./defaults";

export type Msg = {
  typeUrl: string;
  value: { [key: string]: any };
};

export type TxOptions = {
  fee?: StdFee;
};

export class TxError extends Error {
  constructor(message: string = "Tx Error", options?: ErrorOptions) {
    super(message, options);
    this.name = "TxError";
  }
}

export class TxResult {
  error?: TxError;
  response?: DeliverTxResponse;

  constructor({ error, response }: Pick<TxResult, "error" | "response">) {
    this.error = error;
    this.response = response;
  }

  get errorMsg() {
    return this.isOutOfGas
      ? `Out of gas. gasWanted: ${this.response?.gasWanted} gasUsed: ${this.response?.gasUsed}`
      : this.error?.message || "Txn Failed";
  }

  get isSuccess() {
    return this.response && isDeliverTxSuccess(this.response);
  }

  get isOutOfGas() {
    return this.response && this.response.gasUsed > this.response.gasWanted;
  }
}

export function useTx() {
  const chainName = defaultChainName;
  const { address, estimateFee, getOfflineSignerDirect } = useChain(chainName);

  async function tx(msgs: Msg[], memo: string, options: TxOptions = {}) {
    if (!address) {
      return new TxResult({ error: new TxError("Wallet not connected") });
    }

    try {
      const fee = options.fee || (await estimateFee(msgs));
      const finalMemo = memo || "";
      const signer: any = await getOfflineSignerDirect();
      // create the signing client using the given signer and selected rpc endpoint
      // const rpc = await getRpcEndpoint();
      const client = await getSigningAssetmantleClient({
        rpcEndpoint: rpc, // Use the rewritten route instead of the direct external URL
        signer,
      });
      // const client = await getSigningStargateClient();
      // check if enough balance is there
      const balance = await client.getBalance(address, defaultChainDenom);
      if (Number(balance?.amount) < 0.3) {
        return new TxResult({ error: new TxError("Insuffecient Balance") });
      }

      if (!client)
        return new TxResult({ error: new TxError("Invalid stargate client") });

      const response = await client.signAndBroadcast(
        address,
        msgs,
        fee,
        finalMemo
      );

      /* const signed = await client.sign(address, msgs, fee, finalMemo);
      if (!signed)
        return new TxResult({ error: new TxError("Invalid transaction") });
      const response: any = await client.broadcastTx(
        Uint8Array.from(txRaw.encode(signed).finish())
      ); */

      //@ts-ignore
      return isDeliverTxSuccess(response)
        ? //@ts-ignore
          new TxResult({ response })
        : new TxResult({
            //@ts-ignore
            response,
            error: new TxError(response?.code?.toString?.()),
          });
    } catch (e: any) {
      return new TxResult({ error: new TxError(e.message || "Tx Error") });
    }
  }

  return { tx };
}

export function useBalance() {
  const { getOfflineSignerDirect } = useChain(defaultChainName);

  // Accept address as argument to make it flexible
  async function getBalance(address: string): Promise<string> {
    if (!address) {
      throw new Error("Address not provided");
    }

    try {
      const signer: any = await getOfflineSignerDirect();
      // Create the client (like you do in useTx)
      const client = await getSigningAssetmantleClient({
        rpcEndpoint: rpc, // Make sure you have the correct RPC endpoint
        signer,
      });

      // Fetch the balance for the provided address and denom
      const balance = await client.getBalance(address, defaultChainDenom);

      // If balance exists, convert it to a float with 6 decimal places
      if (balance) {
        const amount = new BigNumber(balance.amount);
        const convertedAmount = amount.dividedBy(10 ** 6).toFixed(6); // Divide by 10^6 and fix to 6 decimal places
        return convertedAmount;
      }

      // Return "0" if no balance is found
      return "0";
    } catch (e: any) {
      throw new Error(`Failed to get balance: ${e.message || "Unknown error"}`);
    }
  }

  return { getBalance };
}
