"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalaChainSuccessResponse = exports.GalaChainErrorResponse = exports.GalaChainResponse = exports.GalaChainResponseType = exports.GC_NETWORK_ID = void 0;
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
const utils_1 = require("../utils");
exports.GC_NETWORK_ID = "GC";
var GalaChainResponseType;
(function (GalaChainResponseType) {
    GalaChainResponseType[GalaChainResponseType["Error"] = 0] = "Error";
    GalaChainResponseType[GalaChainResponseType["Success"] = 1] = "Success";
})(GalaChainResponseType || (exports.GalaChainResponseType = GalaChainResponseType = {}));
class GalaChainResponse {
    static Success(Data) {
        return new GalaChainSuccessResponse(Data);
    }
    static Error(MessageOrError, ErrorCode, ErrorKey, ErrorPayload) {
        if (typeof MessageOrError === "string") {
            return new GalaChainErrorResponse(MessageOrError, ErrorCode, ErrorKey, ErrorPayload);
        }
        else {
            return new GalaChainErrorResponse(MessageOrError);
        }
    }
    static Wrap(op) {
        return op
            .then((Data) => GalaChainResponse.Success(Data))
            .catch((e) => GalaChainResponse.Error(e));
    }
    static isSuccess(r) {
        return r.Status === GalaChainResponseType.Success;
    }
    static isError(r) {
        return r.Status === GalaChainResponseType.Error;
    }
    static deserialize(constructor, object) {
        var _a;
        const json = typeof object === "string" ? JSON.parse(object) : object;
        if (json.Status === GalaChainResponseType.Error) {
            return (0, utils_1.deserialize)(GalaChainErrorResponse, json);
        }
        else if (constructor === undefined) {
            // TODO we are cheating somewhat with response type, fix with method overloading
            return (0, utils_1.deserialize)(GalaChainSuccessResponse, json);
        }
        else {
            // nested objects might be not deserialized properly for generics, that's why we deserialize `Data` again
            const data = typeof json.Data === "object"
                ? (0, utils_1.deserialize)(constructor, ((_a = json.Data) !== null && _a !== void 0 ? _a : {}))
                : json.Data;
            return new GalaChainSuccessResponse(data);
        }
    }
}
exports.GalaChainResponse = GalaChainResponse;
class GalaChainErrorResponse extends GalaChainResponse {
    constructor(messageOrError, errorCode, errorKey, errorPayload) {
        super();
        if (typeof messageOrError === "string") {
            this.Status = GalaChainResponseType.Error;
            this.Message = messageOrError;
            this.ErrorCode = errorCode !== null && errorCode !== void 0 ? errorCode : utils_1.ErrorCode.DEFAULT_ERROR;
            this.ErrorKey = errorKey !== null && errorKey !== void 0 ? errorKey : "UNKNOWN";
            this.ErrorPayload = errorPayload;
        }
        else {
            const chainError = utils_1.ChainError.from(messageOrError);
            this.Status = GalaChainResponseType.Error;
            this.Message = chainError.message;
            this.ErrorCode = chainError.code;
            this.ErrorKey = chainError.key;
            this.ErrorPayload = chainError.payload;
        }
    }
}
exports.GalaChainErrorResponse = GalaChainErrorResponse;
class GalaChainSuccessResponse extends GalaChainResponse {
    constructor(data) {
        super();
        this.Status = GalaChainResponseType.Success;
        this.Data = data;
    }
}
exports.GalaChainSuccessResponse = GalaChainSuccessResponse;
//# sourceMappingURL=contract.js.map