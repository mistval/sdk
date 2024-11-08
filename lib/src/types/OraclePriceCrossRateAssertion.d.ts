import { ChainObject } from "./ChainObject";
import { OraclePriceAssertion } from "./OraclePriceAssertion";
export declare class OraclePriceCrossRateAssertion extends ChainObject {
    static INDEX_KEY: string;
    oracle: string;
    identity: string;
    txid: string;
    baseTokenCrossRate: OraclePriceAssertion;
    quoteTokenCrossRate: OraclePriceAssertion;
}