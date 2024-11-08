import { BigNumber } from "bignumber.js";
import { ChainObject } from "./ChainObject";
export declare class FeePendingBalance extends ChainObject {
    static INDEX_KEY: string;
    owner: string;
    quantity: BigNumber;
}
