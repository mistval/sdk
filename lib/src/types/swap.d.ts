import BigNumber from "bignumber.js";
import { ChainObject } from "./ChainObject";
import { TokenInstanceQuantity } from "./TokenInstance";
import { TokenSwapRequest } from "./TokenSwapRequest";
import { ChainCallDTO } from "./dtos";
export declare class RequestTokenSwapDto extends ChainCallDTO {
    static DEFAULT_EXPIRES: number;
    offeredBy?: string;
    offeredTo?: string;
    offered: Array<TokenInstanceQuantity>;
    wanted: Array<TokenInstanceQuantity>;
    uses: BigNumber;
    expires?: number;
}
export declare class ExpectedTokenSwap extends ChainCallDTO {
    offered: Array<TokenInstanceQuantity>;
    wanted: Array<TokenInstanceQuantity>;
}
export declare class FillTokenSwapDto extends ChainCallDTO {
    static DEFAULT_USES: BigNumber;
    swapRequestId: string;
    expectedTokenSwap?: ExpectedTokenSwap;
    filledBy?: string;
    uses?: BigNumber;
}
export declare class BatchFillTokenSwapDto extends ChainCallDTO {
    static MAX_ARR_SIZE: number;
    swapDtos: Array<FillTokenSwapDto>;
}
export declare class TerminateTokenSwapDto extends ChainCallDTO {
    readonly swapRequestId: string;
}
export declare class FetchTokenSwapsDto extends ChainCallDTO {
    created?: number;
}
export declare class FetchTokenSwapByRequestIdDto extends ChainCallDTO {
    swapRequestId: string;
}
export declare class FetchTokenSwapsByInstanceDto extends ChainCallDTO {
    static readonly MAX_LIMIT: number;
    static readonly DEFAULT_LIMIT = 1000;
    collection?: string;
    category?: string;
    type?: string;
    additionalKey?: string;
    instance?: string;
    bookmark?: string;
    limit?: number;
}
export declare class FetchTokenSwapsByUserDto extends ChainCallDTO {
    static readonly MAX_LIMIT: number;
    static readonly DEFAULT_LIMIT = 1000;
    user?: string;
    bookmark?: string;
    limit?: number;
}
export declare class FetchTokenSwapsWithPaginationResponse extends ChainCallDTO {
    nextPageBookmark?: string | undefined;
    results: TokenSwapRequest[];
}
export declare class EnsureTokenSwapIndexingDto extends ChainCallDTO {
    swapRequestIds: string[];
}
export declare class EnsureTokenSwapIndexingResponse extends ChainCallDTO {
    noOp: boolean;
    writes: ChainObject[];
}
export declare class CleanTokenSwapsDto extends ChainCallDTO {
    swapRequestIds?: string[];
}
export declare class CleanTokenSwapsResponse extends ChainCallDTO {
    deletes: TokenSwapRequest[];
}
