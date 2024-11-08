"use strict";
/*
 * Copyright (c) Gala Games Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedError = exports.RuntimeError = exports.DefaultError = exports.NoLongerAvailableError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.PaymentRequiredError = exports.UnauthorizedError = exports.ValidationFailedError = exports.ChainError = exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["VALIDATION_FAILED"] = 400] = "VALIDATION_FAILED";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    ErrorCode[ErrorCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    ErrorCode[ErrorCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ErrorCode[ErrorCode["CONFLICT"] = 409] = "CONFLICT";
    ErrorCode[ErrorCode["NO_LONGER_AVAILABLE"] = 410] = "NO_LONGER_AVAILABLE";
    ErrorCode[ErrorCode["DEFAULT_ERROR"] = 500] = "DEFAULT_ERROR";
    ErrorCode[ErrorCode["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
class ChainError extends Error {
    constructor(message, payloadOrKey, payloadOpt) {
        super(message);
        const [key, payload] = typeof payloadOrKey === "string"
            ? [payloadOrKey, payloadOpt]
            : [undefined, payloadOrKey];
        this.key = ChainError.normalizedKey(key !== null && key !== void 0 ? key : this.constructor);
        this.payload = payload;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    static normalizedKey(fn) {
        var _a, _b;
        let rawCode;
        if (typeof fn === "string") {
            rawCode = fn;
        }
        else {
            const regex = /[A-Z]{2,}(?=[A-Z]+[a-z]*[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
            rawCode =
                (_b = (_a = fn.name
                    .match(regex)) === null || _a === void 0 ? void 0 : _a.join("_").toUpperCase().replace(/_ERROR$/g, "")) !== null && _b !== void 0 ? _b : "UNKNOWN";
        }
        return rawCode.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
    }
    static withCode(code) {
        return class ChainErrorWithCode extends ChainError {
            constructor() {
                super(...arguments);
                this.code = code;
            }
        };
    }
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
    andExec(fn) {
        fn(this);
        return this;
    }
    logError(logger) {
        logger.error(this.message);
        return this;
    }
    logWarn(logger) {
        logger.warn(this.message);
        return this;
    }
    matches(key) {
        if (typeof key === "function") {
            return !!key.name && this.constructor.name === key.name;
        }
        else {
            return key === this.code;
        }
    }
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
    map(key, newError) {
        // return original error if there is no key match
        if (!this.matches(key)) {
            return this;
        }
        if (typeof newError === "function") {
            return newError(this);
        }
        return newError;
    }
    static isChainError(e) {
        return !!e && "key" in e && e.key !== undefined && "code" in e && e.code !== undefined;
    }
    static from(e) {
        var _a;
        return this.isChainError(e) ? e : new DefaultError((_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : "Unknown error occured");
    }
    static matches(e, key) {
        return ChainError.isChainError(e) && e.matches(key);
    }
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
    static map(e, key, newError) {
        if (ChainError.isChainError(e)) {
            return e.map(key, newError);
        }
        else {
            return ChainError.from(e);
        }
    }
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
    static ignore(e, key, returnValue = undefined) {
        if (ChainError.isChainError(e) && e.matches(key)) {
            return returnValue;
        }
        else {
            throw e;
        }
    }
}
exports.ChainError = ChainError;
class ValidationFailedError extends ChainError.withCode(ErrorCode.VALIDATION_FAILED) {
}
exports.ValidationFailedError = ValidationFailedError;
class UnauthorizedError extends ChainError.withCode(ErrorCode.UNAUTHORIZED) {
}
exports.UnauthorizedError = UnauthorizedError;
class PaymentRequiredError extends ChainError.withCode(ErrorCode.PAYMENT_REQUIRED) {
}
exports.PaymentRequiredError = PaymentRequiredError;
class ForbiddenError extends ChainError.withCode(ErrorCode.FORBIDDEN) {
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends ChainError.withCode(ErrorCode.NOT_FOUND) {
}
exports.NotFoundError = NotFoundError;
class ConflictError extends ChainError.withCode(ErrorCode.CONFLICT) {
}
exports.ConflictError = ConflictError;
class NoLongerAvailableError extends ChainError.withCode(ErrorCode.NO_LONGER_AVAILABLE) {
}
exports.NoLongerAvailableError = NoLongerAvailableError;
class DefaultError extends ChainError.withCode(ErrorCode.DEFAULT_ERROR) {
}
exports.DefaultError = DefaultError;
class RuntimeError extends ChainError.withCode(ErrorCode.DEFAULT_ERROR) {
}
exports.RuntimeError = RuntimeError;
class NotImplementedError extends ChainError.withCode(ErrorCode.NOT_IMPLEMENTED) {
}
exports.NotImplementedError = NotImplementedError;
//# sourceMappingURL=error.js.map