import { defaultChainDenom } from "@/constant";
import { getSigningAssetmantleClient } from "@assetmantle/mantlejs";
import {
  DeliverTxResponse,
  isDeliverTxSuccess,
  StdFee,
} from "@cosmjs/stargate";
import { useChain } from "@cosmos-kit/react";
import { cosmos } from "interchain-query";
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
  const {
    address,
    getSigningStargateClient,
    estimateFee,
    getOfflineSignerDirect,
    getRpcEndpoint,
  } = useChain(chainName);

  async function tx(msgs: Msg[], memo: string, options: TxOptions = {}) {
    if (!address) {
      return new TxResult({ error: new TxError("Wallet not connected") });
    }

    try {
      const txRaw = cosmos.tx.v1beta1.TxRaw;
      const fee = options.fee || (await estimateFee(msgs));
      const signer: any = await getOfflineSignerDirect();
      // create the signing client using the given signer and selected rpc endpoint
      const rpc = await getRpcEndpoint();
      const client = await getSigningAssetmantleClient({
        rpcEndpoint: rpc,
        signer,
      });
      // const client = await getSigningStargateClient();
      const finalMemo = memo || "";
      // check if enough balance is there
      const balance = await client.getBalance(address, defaultChainDenom);
      if (Number(balance?.amount) < 0.3) {
        return new TxResult({ error: new TxError("Insuffecient Balance") });
      }

      if (!client)
        return new TxResult({ error: new TxError("Invalid stargate client") });

      const response = await client.signAndBroadcast(address, msgs, fee, finalMemo);

      /* const signed = await client.sign(address, msgs, fee, finalMemo);

      if (!signed)
        return new TxResult({ error: new TxError("Invalid transaction") });

      const response: any = await client.broadcastTx(
        Uint8Array.from(txRaw.encode(signed).finish())
      ); */

      return isDeliverTxSuccess(response)
        ? new TxResult({ response })
        : new TxResult({
            response,
            error: new TxError(response?.code?.toString?.()),
          });
    } catch (e: any) {
      return new TxResult({ error: new TxError(e.message || "Tx Error") });
    }
  }

  return { tx };
}
