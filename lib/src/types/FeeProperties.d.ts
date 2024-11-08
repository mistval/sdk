import BigNumber from "bignumber.js";
import { ChainObject } from "./ChainObject";
export declare class FeeProperties extends ChainObject {
    static INDEX_KEY: string;
    id: string;
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    instance: BigNumber;
}