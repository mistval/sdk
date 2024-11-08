import BigNumber from "bignumber.js";
import { ChainObject } from "./ChainObject";
import { OraclePriceAssertion } from "./OraclePriceAssertion";
import { OraclePriceCrossRateAssertion } from "./OraclePriceCrossRateAssertion";
import { TokenClassKey } from "./TokenClass";
export declare class OracleBridgeFeeAssertion extends ChainObject {
    static INDEX_KEY: string;
    oracle: string;
    signingIdentity: string;
    txid: string;
    galaExchangeRate?: OraclePriceAssertion;
    galaExchangeCrossRate?: OraclePriceCrossRateAssertion;
    galaDecimals: number;
    bridgeToken: TokenClassKey;
    bridgeTokenIsNonFungible: boolean;
    estimatedTxFeeUnitsTotal: BigNumber;
    estimatedPricePerTxFeeUnit: BigNumber;
    estimatedTotalTxFeeInExternalToken: BigNumber;
    estimatedTotalTxFeeInGala: BigNumber;
    timestamp: number;
}
