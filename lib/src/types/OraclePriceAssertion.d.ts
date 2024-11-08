import BigNumber from "bignumber.js";
import { ChainObject } from "./ChainObject";
import { TokenInstanceKey } from "./TokenInstance";
export declare class ExternalToken extends ChainObject {
    name: string;
    symbol: string;
}
export declare class OraclePriceAssertion extends ChainObject {
    static INDEX_KEY: string;
    oracle: string;
    identity: string;
    txid: string;
    baseToken?: TokenInstanceKey;
    externalBaseToken?: ExternalToken;
    quoteToken?: TokenInstanceKey;
    externalQuoteToken?: ExternalToken;
    exchangeRate: BigNumber;
    baseTokenQuantity?: BigNumber;
    quoteTokenQuantity?: BigNumber;
    source?: string;
    sourceUrl?: string;
    timestamp: number;
}