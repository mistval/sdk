import { ChainError } from "../utils";
import { ClassConstructor, Inferred } from "./dtos";
export declare const GC_NETWORK_ID = "GC";
export declare enum GalaChainResponseType {
    Error = 0,
    Success = 1
}
export declare abstract class GalaChainResponse<T> {
    readonly Status: GalaChainResponseType;
    readonly Message?: string;
    readonly ErrorCode?: number;
    readonly ErrorKey?: string;
    readonly ErrorPayload?: unknown;
    readonly Data?: T;
    static Success<T>(Data: T): GalaChainResponse<T>;
    static Error<T>(e: {
        message?: string;
    }): GalaChainResponse<T>;
    static Error<T>(e: ChainError): GalaChainResponse<T>;
    static Error<T>(Message: string, ErrorCode: number, ErrorKey: string, ErrorPayload?: Record<string, unknown>): GalaChainResponse<T>;
    static Wrap<T>(op: Promise<T>): Promise<GalaChainResponse<T>>;
    static isSuccess<T>(r: GalaChainResponse<T>): r is GalaChainSuccessResponse<T>;
    static isError<T>(r: GalaChainResponse<T>): r is GalaChainErrorResponse<T>;
    static deserialize<T>(constructor: ClassConstructor<Inferred<T>> | undefined, object: string | Record<string, unknown>): GalaChainResponse<T>;
}
export declare class GalaChainErrorResponse<T> extends GalaChainResponse<T> {
    readonly Status: GalaChainResponseType.Error;
    readonly Message: string;
    readonly ErrorCode: number;
    readonly ErrorKey: string;
    readonly ErrorPayload?: Record<string, unknown>;
    constructor(message: string, errorCode?: number, errorKey?: string, errorPayload?: Record<string, unknown>);
    constructor(error: {
        message?: string;
    });
    constructor(error: ChainError);
}
export declare class GalaChainSuccessResponse<T> extends GalaChainResponse<T> {
    readonly Status: GalaChainResponseType.Success;
    readonly Data: T;
    constructor(data: T);
}