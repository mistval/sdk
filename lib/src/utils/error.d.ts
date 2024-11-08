type ClassConstructor<T> = {
    new (...args: unknown[]): T;
};
export declare enum ErrorCode {
    VALIDATION_FAILED = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    NO_LONGER_AVAILABLE = 410,
    DEFAULT_ERROR = 500,
    NOT_IMPLEMENTED = 501
}
export interface OptionalChainErrorData {
    message?: string;
    code?: ErrorCode;
    key?: Uppercase<string>;
    payload?: Record<string, unknown>;
}
export declare abstract class ChainError extends Error implements OptionalChainErrorData {
    /**
     * Status code, a value from ErrorCode enum. It is directly mapped to HTTP,
     * status, it is a constant value to be used by clients integrating with
     * the chain.
     */
    readonly code: ErrorCode;
    /**
     * An upper case string to be used as a key do diagnose where the error comes
     * from and help with regular development. It should not be used by client
     * integrating with the chain since we don't guarantee it won't change.
     * It is generated from original error class name.
     */
    readonly key: Uppercase<string>;
    /**
     * Additional information to be used by
     */
    readonly payload?: Record<string, unknown>;
    constructor(message: string);
    constructor(message: string, key: Uppercase<string>);
    constructor(message: string, key: Uppercase<string>, payload: Record<string, unknown>);
    constructor(message: string, payload: Record<string, unknown> | unknown);
    static normalizedKey(fn: string | Function): Uppercase<string>;
    static withCode(code: ErrorCode): ClassConstructor<ChainError>;
    /**
     * Allows to execute function getting as a parameter the current error.
     *
     * @param fn
     *
     * @example
     * throw CommonChainError.objectNotFound(objectId).andExec((e) => {
     *   logger.error(e.message);
     * });
     */
    andExec(fn: (e: ChainError) => void): ChainError;
    logError(logger: {
        error(message: string): void;
    }): ChainError;
    logWarn(logger: {
        warn(message: string): void;
    }): ChainError;
    matches(key: ErrorCode | ClassConstructor<ChainError>): boolean;
    /**
     * Maps ChainError to another chain error by error code if `key` param matches
     * current error code or current diagnostic key. Otherwise, returns original
     * error.
     *
     * Useful in rethrowing an error or mapping an error to another one in catch
     * clauses or catch methods in promises.
     *
     * @param key error code or error class to match
     * @param newError new error or a function to create the new error
     */
    map(key: ErrorCode | ClassConstructor<ChainError>, newError: ChainError | ((e: ChainError) => ChainError)): ChainError;
    static isChainError(e: object | undefined): e is ChainError;
    static from(e: object & {
        message?: string;
    }): ChainError;
    static matches(e: {
        message?: string;
    } | ChainError, key: ErrorCode | ClassConstructor<ChainError>): boolean;
    /**
     * Maps ChainError to another chain error by error code, or returns original
     * error if no error code matches, or returns default chain error if a given
     * parameter is not a ChainError instance.
     *
     * Useful in rethrowing an error or mapping an error to another one in catch
     * clauses or catch methods in promises.
     *
     * @param e original error
     * @param key error code or error class to match
     * @param newError new error or a function to create the new error
     */
    static map(e: {
        message?: string;
    } | ChainError, key: ErrorCode | ClassConstructor<ChainError>, newError: ChainError | ((e: ChainError) => ChainError)): ChainError;
    /**
     * Maps ChainError to a specified return value by error code, or re-throws
     * original error if no error code matches, or returns default chain error
     * if a given parameter is not a ChainError instance.
     *
     * Useful in rethrowing an error or mapping an error to another one in catch
     * clauses or catch methods in promises.
     *
     * For instance when you want to get an object from chain, and ignore the
     * NOT_FOUND error, but you don't want to mute other errors:
     *
     * ```ts
     * getObjectByKey(...)
     *   .catch((e) => CommonChainError.map(e, ErrorCode.NOT_FOUND));
     * ```
     *
     * @param e original error
     * @param key error code or error class to match
     * @param returnValue value to be returned if error code matches
     */
    static ignore<T = undefined>(e: {
        message?: string;
    } | ChainError, key: ErrorCode | ClassConstructor<ChainError>, returnValue?: T): T;
}
declare const ValidationFailedError_base: ClassConstructor<ChainError>;
export declare class ValidationFailedError extends ValidationFailedError_base {
}
declare const UnauthorizedError_base: ClassConstructor<ChainError>;
export declare class UnauthorizedError extends UnauthorizedError_base {
}
declare const PaymentRequiredError_base: ClassConstructor<ChainError>;
export declare class PaymentRequiredError extends PaymentRequiredError_base {
}
declare const ForbiddenError_base: ClassConstructor<ChainError>;
export declare class ForbiddenError extends ForbiddenError_base {
}
declare const NotFoundError_base: ClassConstructor<ChainError>;
export declare class NotFoundError extends NotFoundError_base {
}
declare const ConflictError_base: ClassConstructor<ChainError>;
export declare class ConflictError extends ConflictError_base {
}
declare const NoLongerAvailableError_base: ClassConstructor<ChainError>;
export declare class NoLongerAvailableError extends NoLongerAvailableError_base {
}
declare const DefaultError_base: ClassConstructor<ChainError>;
export declare class DefaultError extends DefaultError_base {
}
declare const RuntimeError_base: ClassConstructor<ChainError>;
export declare class RuntimeError extends RuntimeError_base {
}
declare const NotImplementedError_base: ClassConstructor<ChainError>;
export declare class NotImplementedError extends NotImplementedError_base {
}
export {};