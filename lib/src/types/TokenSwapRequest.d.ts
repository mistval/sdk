import BigNumber from "bignumber.js";
import { ChainObject } from "./ChainObject";
import { TokenInstanceQuantity } from "./TokenInstance";
export declare class TokenSwapRequest extends ChainObject {
    created: number;
    txid: string;
    swapRequestId: string;
    offered: Array<TokenInstanceQuantity>;
    wanted: Array<TokenInstanceQuantity>;
    offeredTo?: string;
    offeredBy: string;
    fillIds: Array<string>;
    uses: BigNumber;
    usesSpent: BigNumber;
    expires: number;
    static INDEX_KEY: string;
}
