import BigNumber from "bignumber.js";
import { GrantAllowanceQuantity } from "./GrantAllowance";
import { TokenAllowance } from "./TokenAllowance";
import { TokenInstanceKey, TokenInstanceQueryKey } from "./TokenInstance";
import { AllowanceKey, AllowanceType, MintRequestDto } from "./common";
import { ChainCallDTO } from "./dtos";
export declare class FetchAllowancesDto extends ChainCallDTO {
    static readonly MAX_LIMIT: number;
    static readonly DEFAULT_LIMIT = 1000;
    grantedTo: string;
    collection?: string;
    category?: string;
    type?: string;
    additionalKey?: string;
    instance?: string;
    allowanceType?: AllowanceType;
    grantedBy?: string;
    bookmark?: string;
    limit?: number;
}
export declare class FetchAllowancesLegacyDto extends ChainCallDTO {
    grantedTo: string;
    collection?: string;
    category?: string;
    type?: string;
    additionalKey?: string;
    instance?: string;
    allowanceType?: AllowanceType;
    grantedBy?: string;
    bookmark?: string;
}
export declare class FetchAllowancesResponse extends ChainCallDTO {
    results: TokenAllowance[];
    nextPageBookmark?: string;
}
export declare class DeleteAllowancesDto extends ChainCallDTO {
    grantedTo: string;
    grantedBy?: string;
    collection?: string;
    category?: string;
    type?: string;
    additionalKey?: string;
    instance?: string;
    allowanceType?: AllowanceType;
}
export declare class GrantAllowanceDto extends ChainCallDTO {
    static DEFAULT_EXPIRES: number;
    tokenInstance: TokenInstanceQueryKey;
    quantities: Array<GrantAllowanceQuantity>;
    allowanceType: AllowanceType;
    uses: BigNumber;
    expires?: number;
}
/**
 * Experimental: Defines allowances to be created. High-throughput implementation.
 *
 * @experimental 2023-03-23
 */
export declare class HighThroughputGrantAllowanceDto extends ChainCallDTO {
    static DEFAULT_EXPIRES: number;
    tokenInstance: TokenInstanceQueryKey;
    quantities: Array<GrantAllowanceQuantity>;
    allowanceType: AllowanceType;
    uses: BigNumber;
    expires?: number;
}
export declare class FulfillMintAllowanceDto extends ChainCallDTO {
    static MAX_ARR_SIZE: number;
    requests: MintRequestDto[];
}
export declare class FullAllowanceCheckDto extends ChainCallDTO {
    owner?: string;
    grantedTo?: string;
    collection?: string;
    category?: string;
    type?: string;
    additionalKey?: string;
    allowanceType?: AllowanceType;
}
export declare class FullAllowanceCheckResDto extends ChainCallDTO {
    all: boolean;
    missing?: Array<TokenInstanceKey>;
}
export declare class RefreshAllowanceDto extends ChainCallDTO {
    allowanceKey: AllowanceKey;
    uses: BigNumber;
    expires: number;
}
export declare class RefreshAllowancesDto extends ChainCallDTO {
    allowances: Array<RefreshAllowanceDto>;
}
