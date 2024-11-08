import { BigNumber } from "bignumber.js";
import { RangedChainObject } from "./RangedChainObject";
import { TokenAllowance } from "./TokenAllowance";
import { TokenMintAllowance } from "./TokenMintAllowance";
import { TokenMintStatus } from "./common";
export declare class TokenMintAllowanceRequest extends RangedChainObject {
    static INDEX_KEY: string;
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    timeKey: string;
    grantedTo: string;
    totalKnownMintAllowancesCount: BigNumber;
    created: number;
    grantedBy: string;
    quantity: BigNumber;
    state: TokenMintStatus;
    id: string;
    uses: BigNumber;
    expires?: number;
    epoch: string;
    requestId(): string;
    fulfillmentKey(): string;
    fulfill(instance: BigNumber): [TokenMintAllowance, TokenAllowance];
}
