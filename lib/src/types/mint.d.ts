import BigNumber from "bignumber.js";
import { TokenClassKey } from "./TokenClass";
import { BurnToMintConfiguration, PostMintLockConfiguration, TokenMintConfiguration } from "./TokenMintConfiguration";
import { AllowanceKey, MintRequestDto } from "./common";
import { ChainCallDTO } from "./dtos";
export declare class MintTokenDto extends ChainCallDTO {
    static MAX_NFT_MINT_SIZE: number;
    tokenClass: TokenClassKey;
    owner?: string;
    quantity: BigNumber;
    allowanceKey?: AllowanceKey;
}
export declare class MintTokenWithAllowanceDto extends ChainCallDTO {
    tokenClass: TokenClassKey;
    owner?: string;
    tokenInstance: BigNumber;
    quantity: BigNumber;
}
export declare class BatchMintTokenDto extends ChainCallDTO {
    static MAX_ARR_SIZE: number;
    mintDtos: Array<MintTokenDto>;
}
/**
 * Experimental: Defines an action to mint a token. High-throughput implementation.
 *
 * @experimental 2023-03-23
 */
export declare class HighThroughputMintTokenDto extends ChainCallDTO {
    static MAX_NFT_MINT_SIZE: number;
    tokenClass: TokenClassKey;
    owner?: string;
    quantity: BigNumber;
    allowanceKey?: AllowanceKey;
}
export declare class FulfillMintDto extends ChainCallDTO {
    static MAX_ARR_SIZE: number;
    requests: MintRequestDto[];
}
export declare class FetchMintRequestsDto extends ChainCallDTO {
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    startTimestamp: number;
    endTimestamp: number;
}
export declare class FetchTokenSupplyDto extends ChainCallDTO {
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
}
export declare class FetchTokenSupplyResponse extends ChainCallDTO {
    supply: BigNumber;
}
export declare class PatchMintAllowanceRequestDto extends ChainCallDTO {
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    totalKnownMintAllowancesCount: BigNumber;
}
export declare class PatchMintRequestDto extends ChainCallDTO {
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    totalKnownMintsCount: BigNumber;
}
export declare class TokenMintConfigurationDto extends ChainCallDTO {
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    preMintBurn?: BurnToMintConfiguration;
    postMintBurn?: BurnToMintConfiguration;
    postMintLock?: PostMintLockConfiguration;
}
export declare class FetchTokenMintConfigurationsDto extends ChainCallDTO {
    static DEFAULT_LIMIT: number;
    static MAX_LIMIT: number;
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    bookmark: string;
    limit?: number;
}
export declare class FetchTokenMintConfigurationsResponse extends ChainCallDTO {
    results: TokenMintConfiguration[];
    bookmark: string;
}
