import BigNumber from "bignumber.js";
import { RangedChainObject } from "./RangedChainObject";
import { TokenMintFulfillment } from "./TokenMintFulfillment";
import { AllowanceKey, TokenMintStatus } from "./common";
export declare class TokenMintRequest extends RangedChainObject {
    static INDEX_KEY: string;
    static OBJECT_TYPE: string;
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    timeKey: string;
    owner: string;
    totalKnownMintsCount: BigNumber;
    requestor: string;
    created: number;
    quantity: BigNumber;
    state: TokenMintStatus;
    id: string;
    epoch: string;
    allowanceKey?: AllowanceKey;
    isTimeKeyValid(): boolean;
    requestId(): string;
    fulfillmentKey(): string;
    fulfill(qty: BigNumber): TokenMintFulfillment;
}