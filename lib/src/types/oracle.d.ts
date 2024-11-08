import BigNumber from "bignumber.js";
import { OracleDefinition } from "./OracleDefinition";
import { ExternalToken, OraclePriceAssertion } from "./OraclePriceAssertion";
import { OraclePriceCrossRateAssertion } from "./OraclePriceCrossRateAssertion";
import { TokenClassKey } from "./TokenClass";
import { TokenInstanceKey } from "./TokenInstance";
import { ChainCallDTO } from "./dtos";
export declare class OracleDefinitionDto extends ChainCallDTO {
    name: string;
    authorities: string[];
}
export declare class FetchOracleDefinitionsDto extends ChainCallDTO {
    name?: string | undefined;
    bookmark?: string | undefined;
    limit?: number | undefined;
}
export declare class FetchOracleAssertionsDto extends ChainCallDTO {
    oracle?: string | undefined;
    identity?: string | undefined;
    txid?: string | undefined;
    bookmark?: string | undefined;
    limit?: number | undefined;
}
export declare class FetchOracleDefinitionsResponse extends ChainCallDTO {
    static DEFAULT_LIMIT: number;
    results: OracleDefinition[];
    bookmark?: string | undefined;
}
export declare class OraclePriceAssertionDto extends ChainCallDTO {
    oracle: string;
    identity: string;
    baseToken?: TokenInstanceKey;
    externalBaseToken?: ExternalToken;
    quoteToken?: TokenInstanceKey;
    externalQuoteToken?: ExternalToken;
    exchangeRate: BigNumber;
    source?: string;
    sourceUrl?: string;
    timestamp: number;
}
export declare class FetchOraclePriceAssertionsResponse extends ChainCallDTO {
    static DEFAULT_LIMIT: number;
    results: OraclePriceAssertion[];
    bookmark?: string | undefined;
}
export declare class OraclePriceCrossRateAssertionDto extends ChainCallDTO {
    oracle: string;
    identity: string;
    baseTokenCrossRate: OraclePriceAssertionDto;
    quoteTokenCrossRate: OraclePriceAssertionDto;
    crossRateToken?: TokenInstanceKey;
    externalCrossRateToken?: ExternalToken;
    crossRate: BigNumber;
    validateCrossRateTokenKeys(): void;
    calculateCrossRate(): BigNumber;
    validateCrossRate(): void;
}
export declare class FetchOraclePriceCrossRateAssertionsResponse extends ChainCallDTO {
    static DEFAULT_LIMIT: number;
    results: OraclePriceCrossRateAssertion[];
    bookmark?: string;
}
export declare class DeleteOracleAssertionsDto extends ChainCallDTO {
    static MAX_LIMIT: number;
    chainKeys: string[];
}
export declare class DeleteOracleDefinitionDto extends ChainCallDTO {
    name: string;
}
export declare class OracleBridgeFeeAssertionDto extends ChainCallDTO {
    galaExchangeRate?: OraclePriceAssertionDto;
    galaExchangeCrossRate?: OraclePriceCrossRateAssertionDto;
    galaDecimals: number;
    bridgeToken: TokenClassKey;
    bridgeTokenIsNonFungible: boolean;
    estimatedTxFeeUnitsTotal: BigNumber;
    estimatedPricePerTxFeeUnit: BigNumber;
    estimatedTotalTxFeeInExternalToken: BigNumber;
    estimatedTotalTxFeeInGala: BigNumber;
    timestamp: number;
    signingIdentity: string;
}
