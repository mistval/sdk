"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalaChainResponseError = exports.GalaChainResponseSuccess = void 0;
class GalaChainResponseSuccess {
    constructor(data, hash) {
        this.Hash = hash;
        this.Status = data.Status;
        this.Data = data.Data;
    }
}
exports.GalaChainResponseSuccess = GalaChainResponseSuccess;
class GalaChainResponseError {
    constructor(data) {
        var _a;
        if (typeof data.error === "string" || !data.error) {
            this.Error = data.error;
            this.Message = data.message;
            this.ErrorCode = (_a = data.statusCode) !== null && _a !== void 0 ? _a : 500;
        }
        else {
            this.Error = data.error.ErrorKey;
            this.Message = data.message;
            this.ErrorCode = data.error.ErrorCode;
        }
    }
}
exports.GalaChainResponseError = GalaChainResponseError;
//# sourceMappingURL=galaChain.js.map