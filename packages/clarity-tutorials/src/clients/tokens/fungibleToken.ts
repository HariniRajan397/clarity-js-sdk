import { Client, Receipt } from "@blockstack/clarity";

export class FungibleTokenClient extends Client {
  name = "fungible-token";
  filePath = "tokens/fungible-token";

  async transfer(to: string, value: number, params: { sender: string }): Promise<Receipt> {
    const tx = this.createTransaction({
      method: { name: "transfer", args: [`'${to}`, `${value}`] }
    });
    await tx.sign(params.sender);
    const res = await this.submitTransaction(tx);
    return res;
  }

  async balanceOf(owner: string): Promise<number> {
    const query = this.createQuery({ method: { name: "balance-of", args: [`'${owner}`] } });
    const res = await this.submitQuery(query);
    return parseInt(res.result!);
  }

  async approve(spender: string, amount: number, params: { sender: string }): Promise<Receipt> {
    const tx = this.createTransaction({
      method: { name: "approve", args: [`'${spender}`, `${amount}`] }
    });
    await tx.sign(params.sender);
    const res = await this.submitTransaction(tx);
    return res;
  }

  async revoke(spender: string, params: { sender: string }): Promise<Receipt> {
    const tx = this.createTransaction({ method: { name: "revoke", args: [`'${spender}`] } });
    await tx.sign(params.sender);
    const res = await this.submitTransaction(tx);
    return res;
  }

  async allowanceOf(spender: string, owner: string): Promise<number> {
    const query = this.createQuery({
      method: { name: "allowance-of", args: [`'${spender}`, `'${owner}`] }
    });
    const res = await this.submitQuery(query);
    return parseInt(res.result!);
  }

  async transferFrom(
    from: string,
    to: string,
    value: number,
    params: { sender: string }
  ): Promise<Receipt> {
    const tx = this.createTransaction({
      method: { name: "transfer-from", args: [`'${from}`, `'${to}`, `${value}`] }
    });
    await tx.sign(params.sender);
    const res = await this.submitTransaction(tx);
    return res;
  }
}
