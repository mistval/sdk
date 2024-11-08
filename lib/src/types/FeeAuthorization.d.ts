import { BigNumber } from "bignumber.js";
import { ChainObject } from "./ChainObject";
export declare class FeeAuthorization extends ChainObject {
    static INDEX_KEY: string;
    authority: string;
    year: string;
    month: string;
    day: string;
    txId: string;
    quantity: BigNumber;
}
