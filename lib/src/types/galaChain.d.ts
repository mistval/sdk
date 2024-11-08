import { GalaChainErrorResponse, GalaChainResponseType, GalaChainSuccessResponse } from "@gala-chain/api";
type GalaChainError<T> = {
    error: string | GalaChainErrorResponse<T>;
    message: string;
    statusCode?: number;
};
export declare class GalaChainResponseSuccess<T> {
    readonly Status: GalaChainResponseType;
    readonly Data: T;
    readonly Hash?: string;
    constructor(data: GalaChainSuccessResponse<T>, hash?: string);
}
export declare class GalaChainResponseError<T> {
    readonly Error: string;
    readonly Message: string;
    readonly ErrorCode: number;
    constructor(data: GalaChainError<T>);
}
export {};
