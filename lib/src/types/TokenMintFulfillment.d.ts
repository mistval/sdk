import BigNumber from "bignumber.js";
import { ChainObject } from "./ChainObject";
import { TokenMintStatus } from "./common";
export declare class TokenMintFulfillment extends ChainObject {
    static INDEX_KEY: string;
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    requestor: string;
    requestCreated: number;
    owner: string;
    quantity: BigNumber;
    state: TokenMintStatus;
    id: string;
    created: number;
}
