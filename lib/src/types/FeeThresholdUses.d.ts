import { BigNumber } from "bignumber.js";
import { ChainObject } from "./ChainObject";
export declare class FeeThresholdUses extends ChainObject {
    static INDEX_KEY: string;
    feeCode: string;
    user: string;
    cumulativeUses: BigNumber;
    cumulativeFeeQuantity: BigNumber;
}
