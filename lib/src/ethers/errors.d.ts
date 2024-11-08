/**
 *  An error may contain additional properties, but those must not
 *  conflict with any implicit properties.
 */
export type ErrorInfo<T> = Omit<T, "code" | "name" | "message" | "shortMessage"> & {
    shortMessage?: string;
};
/**
 *  All errors emitted by ethers have an **ErrorCode** to help
 *  identify and coalesce errors to simplify programmatic analysis.
 *
 *  Each **ErrorCode** is the %%code%% proerty of a coresponding
 *  [[EthersError]].
 *
 *  **Generic Errors**
 *
 *  **``"UNKNOWN_ERROR"``** - see [[UnknownError]]
 *
 *  **``"NOT_IMPLEMENTED"``** - see [[NotImplementedError]]
 *
 *  **``"UNSUPPORTED_OPERATION"``** - see [[UnsupportedOperationError]]
 *
 *  **``"NETWORK_ERROR"``** - see [[NetworkError]]
 *
 *  **``"SERVER_ERROR"``** - see [[ServerError]]
 *
 *  **``"TIMEOUT"``** - see [[TimeoutError]]
 *
 *  **``"BAD_DATA"``** - see [[BadDataError]]
 *
 *  **``"CANCELLED"``** - see [[CancelledError]]
 *
 *  **Operational Errors**
 *
 *  **``"BUFFER_OVERRUN"``** - see [[BufferOverrunError]]
 *
 *  **``"NUMERIC_FAULT"``** - see [[NumericFaultError]]
 *
 *  **Argument Errors**
 *
 *  **``"INVALID_ARGUMENT"``** - see [[InvalidArgumentError]]
 *
 *  **``"MISSING_ARGUMENT"``** - see [[MissingArgumentError]]
 *
 *  **``"UNEXPECTED_ARGUMENT"``** - see [[UnexpectedArgumentError]]
 *
 *  **``"VALUE_MISMATCH"``** - //unused//
 *
 *  **Blockchain Errors**
 *
 *  **``"CALL_EXCEPTION"``** - see [[CallExceptionError]]
 *
 *  **``"INSUFFICIENT_FUNDS"``** - see [[InsufficientFundsError]]
 *
 *  **``"NONCE_EXPIRED"``** - see [[NonceExpiredError]]
 *
 *  **``"REPLACEMENT_UNDERPRICED"``** - see [[ReplacementUnderpricedError]]
 *
 *  **``"TRANSACTION_REPLACED"``** - see [[TransactionReplacedError]]
 *
 *  **``"UNCONFIGURED_NAME"``** - see [[UnconfiguredNameError]]
 *
 *  **``"OFFCHAIN_FAULT"``** - see [[OffchainFaultError]]
 *
 *  **User Interaction Errors**
 *
 *  **``"ACTION_REJECTED"``** - see [[ActionRejectedError]]
 */
export type ErrorCode = "UNKNOWN_ERROR" | "NOT_IMPLEMENTED" | "UNSUPPORTED_OPERATION" | "NETWORK_ERROR" | "SERVER_ERROR" | "TIMEOUT" | "BAD_DATA" | "CANCELLED" | "BUFFER_OVERRUN" | "NUMERIC_FAULT" | "INVALID_ARGUMENT" | "MISSING_ARGUMENT" | "UNEXPECTED_ARGUMENT" | "VALUE_MISMATCH" | "CALL_EXCEPTION" | "INSUFFICIENT_FUNDS" | "NONCE_EXPIRED" | "REPLACEMENT_UNDERPRICED" | "TRANSACTION_REPLACED" | "UNCONFIGURED_NAME" | "OFFCHAIN_FAULT" | "ACTION_REJECTED";
/**
 *  All errors in Ethers include properties to assist in
 *  machine-readable errors.
 */
export interface EthersError<T extends ErrorCode = ErrorCode> extends Error {
    /**
     *  The string error code.
     */
    code: ErrorCode;
    /**
     *  A short message describing the error, with minimal additional
     *  details.
     */
    shortMessage: string;
    /**
     *  Additional info regarding the error that may be useful.
     *
     *  This is generally helpful mostly for human-based debugging.
     */
    info?: Record<string, any>;
    /**
     *  Any related error.
     */
    error?: Error;
}
/**
 *  This Error is a catch-all for when there is no way for Ethers to
 *  know what the underlying problem is.
 */
export interface UnknownError extends EthersError<"UNKNOWN_ERROR"> {
    [key: string]: any;
}
/**
 *  This Error is mostly used as a stub for functionality that is
 *  intended for the future, but is currently not implemented.
 */
export interface NotImplementedError extends EthersError<"NOT_IMPLEMENTED"> {
    /**
     *  The attempted operation.
     */
    operation: string;
}
/**
 *  This Error indicates that the attempted operation is not supported.
 *
 *  This could range from a specific JSON-RPC end-point not supporting
 *  a feature to a specific configuration of an object prohibiting the
 *  operation.
 *
 *  For example, a [[Wallet]] with no connected [[Provider]] is unable
 *  to send a transaction.
 */
export interface UnsupportedOperationError extends EthersError<"UNSUPPORTED_OPERATION"> {
    /**
     *  The attempted operation.
     */
    operation: string;
}
/**
 *  This Error indicates a problem connecting to a network.
 */
export interface NetworkError extends EthersError<"NETWORK_ERROR"> {
    /**
     *  The network event.
     */
    event: string;
}
/**
 *  This Error indicates that a provided set of data cannot
 *  be correctly interpreted.
 */
export interface BadDataError extends EthersError<"BAD_DATA"> {
    /**
     *  The data.
     */
    value: any;
}
/**
 *  This Error indicates that the operation was cancelled by a
 *  programmatic call, for example to ``cancel()``.
 */
export type CancelledError = EthersError<"CANCELLED">;
/**
 *  This Error indicates an attempt was made to read outside the bounds
 *  of protected data.
 *
 *  Most operations in Ethers are protected by bounds checks, to mitigate
 *  exploits when parsing data.
 */
export interface BufferOverrunError extends EthersError<"BUFFER_OVERRUN"> {
    /**
     *  The buffer that was overrun.
     */
    buffer: Uint8Array;
    /**
     *  The length of the buffer.
     */
    length: number;
    /**
     *  The offset that was requested.
     */
    offset: number;
}
/**
 *  This Error indicates an operation which would result in incorrect
 *  arithmetic output has occurred.
 *
 *  For example, trying to divide by zero or using a ``uint8`` to store
 *  a negative value.
 */
export interface NumericFaultError extends EthersError<"NUMERIC_FAULT"> {
    /**
     *  The attempted operation.
     */
    operation: string;
    /**
     *  The fault reported.
     */
    fault: string;
    /**
     *  The value the operation was attempted against.
     */
    value: any;
}
/**
 *  This Error indicates an incorrect type or value was passed to
 *  a function or method.
 */
export interface InvalidArgumentError extends EthersError<"INVALID_ARGUMENT"> {
    /**
     *  The name of the argument.
     */
    argument: string;
    /**
     *  The value that was provided.
     */
    value: any;
    info?: Record<string, any>;
}
/**
 *  This Error indicates there were too few arguments were provided.
 */
export interface MissingArgumentError extends EthersError<"MISSING_ARGUMENT"> {
    /**
     *  The number of arguments received.
     */
    count: number;
    /**
     *  The number of arguments expected.
     */
    expectedCount: number;
}
/**
 *  This Error indicates too many arguments were provided.
 */
export interface UnexpectedArgumentError extends EthersError<"UNEXPECTED_ARGUMENT"> {
    /**
     *  The number of arguments received.
     */
    count: number;
    /**
     *  The number of arguments expected.
     */
    expectedCount: number;
}
/**
 *  The action that resulted in the call exception.
 */
export type CallExceptionAction = "call" | "estimateGas" | "getTransactionResult" | "sendTransaction" | "unknown";
/**
 *  The related transaction that caused the error.
 */
export type CallExceptionTransaction = {
    to: null | string;
    from?: string;
    data: string;
};
/**
 *  This Error indicates an ENS name was used, but the name has not
 *  been configured.
 *
 *  This could indicate an ENS name is unowned or that the current
 *  address being pointed to is the [[ZeroAddress]].
 */
export interface UnconfiguredNameError extends EthersError<"UNCONFIGURED_NAME"> {
    /**
     *  The ENS name that was requested
     */
    value: string;
}
/**
 *  This Error indicates a request was rejected by the user.
 *
 *  In most clients (such as MetaMask), when an operation requires user
 *  authorization (such as ``signer.sendTransaction``), the client
 *  presents a dialog box to the user. If the user denies the request
 *  this error is thrown.
 */
export interface ActionRejectedError extends EthersError<"ACTION_REJECTED"> {
    /**
     *  The requested action.
     */
    action: "requestAccess" | "sendTransaction" | "signMessage" | "signTransaction" | "signTypedData" | "unknown";
    /**
     *  The reason the action was rejected.
     *
     *  If there is already a pending request, some clients may indicate
     *  there is already a ``"pending"`` action. This prevents an app
     *  from spamming the user.
     */
    reason: "expired" | "rejected" | "pending";
}
/**
 *  Returns true if the %%error%% matches an error thrown by ethers
 *  that matches the error %%code%%.
 *
 *  In TypeScript environments, this can be used to check that %%error%%
 *  matches an EthersError type, which means the expected properties will
 *  be set.
 *
 *  @See [ErrorCodes](api:ErrorCode)
 *  @example
 *    try {
 *      // code....
 *    } catch (e) {
 *      if (isError(e, "CALL_EXCEPTION")) {
 *          // The Type Guard has validated this object
 *          console.log(e.data);
 *      }
 *    }
 */
export declare function isError<K extends ErrorCode, T extends CodedEthersError<K>>(error: any, code: K): error is T;
/**
 *  Returns a new Error configured to the format ethers emits errors, with
 *  the %%message%%, [[api:ErrorCode]] %%code%% and additional properties
 *  for the corresponding EthersError.
 *
 *  Each error in ethers includes the version of ethers, a
 *  machine-readable [[ErrorCode]], and depending on %%code%%, additional
 *  required properties. The error message will also include the %%message%%,
 *  ethers version, %%code%% and all additional properties, serialized.
 */
export declare function makeError<K extends ErrorCode, T>(message: string, code: K, info?: ErrorInfo<T>): T;
/**
 *  Throws an EthersError with %%message%%, %%code%% and additional error
 *  %%info%% when %%check%% is falsish..
 *
 *  @see [[api:makeError]]
 */
export declare function assert<K extends ErrorCode, T extends CodedEthersError<K>>(check: unknown, message: string, code: K, info?: ErrorInfo<T>): asserts check;
/**
 *  A simple helper to simply ensuring provided arguments match expected
 *  constraints, throwing if not.
 *
 *  In TypeScript environments, the %%check%% has been asserted true, so
 *  any further code does not need additional compile-time checks.
 */
export declare function assertArgument(check: unknown, message: string, name: string, value: unknown): asserts check;
export declare function assertArgumentCount(count: number, expectedCount: number, message?: string): void;
/**
 *  A conditional type that transforms the [[ErrorCode]] T into
 *  its EthersError type.
 *
 *  @flatworm-skip-docs
 */
export type CodedEthersError<T> = T extends "UNKNOWN_ERROR" ? UnknownError : T extends "NOT_IMPLEMENTED" ? NotImplementedError : T extends "UNSUPPORTED_OPERATION" ? UnsupportedOperationError : T extends "NETWORK_ERROR" ? NetworkError : T extends "BAD_DATA" ? BadDataError : T extends "CANCELLED" ? CancelledError : T extends "BUFFER_OVERRUN" ? BufferOverrunError : T extends "NUMERIC_FAULT" ? NumericFaultError : T extends "INVALID_ARGUMENT" ? InvalidArgumentError : T extends "MISSING_ARGUMENT" ? MissingArgumentError : T extends "UNEXPECTED_ARGUMENT" ? UnexpectedArgumentError : T extends "UNCONFIGURED_NAME" ? UnconfiguredNameError : T extends "ACTION_REJECTED" ? ActionRejectedError : never;
/**
 *  Throws if the normalization %%form%% is not supported.
 */
export declare function assertNormalize(form: string): void;
/**
 *  Many classes use file-scoped values to guard the constructor,
 *  making it effectively private. This facilitates that pattern
 *  by ensuring the %%givenGaurd%% matches the file-scoped %%guard%%,
 *  throwing if not, indicating the %%className%% if provided.
 */
export declare function assertPrivate(givenGuard: any, guard: any, className?: string): void;