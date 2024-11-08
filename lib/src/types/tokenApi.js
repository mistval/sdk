"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenInstanceKey = exports.TokenHold = exports.TokenClassKey = exports.TokenClass = exports.TokenBurn = exports.TokenBalanceWithMetadata = exports.TokenBalance = exports.TokenAllowance = exports.HighThroughputMintTokenResponse = exports.FullAllowanceCheckResponse = exports.FetchTokenClassesResponse = exports.FetchBalancesWithTokenMetadataResponse = exports.FetchAllowancesResponse = void 0;
const tslib_1 = require("tslib");
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
const api_1 = require("@gala-chain/api");
Object.defineProperty(exports, "FetchAllowancesResponse", { enumerable: true, get: function () { return api_1.FetchAllowancesResponse; } });
Object.defineProperty(exports, "FetchBalancesWithTokenMetadataResponse", { enumerable: true, get: function () { return api_1.FetchBalancesWithTokenMetadataResponse; } });
Object.defineProperty(exports, "FetchTokenClassesResponse", { enumerable: true, get: function () { return api_1.FetchTokenClassesResponse; } });
Object.defineProperty(exports, "FullAllowanceCheckResponse", { enumerable: true, get: function () { return api_1.FullAllowanceCheckResDto; } });
Object.defineProperty(exports, "HighThroughputMintTokenResponse", { enumerable: true, get: function () { return api_1.FulfillMintDto; } });
Object.defineProperty(exports, "TokenAllowance", { enumerable: true, get: function () { return api_1.TokenAllowance; } });
Object.defineProperty(exports, "TokenBalanceWithMetadata", { enumerable: true, get: function () { return api_1.TokenBalanceWithMetadata; } });
Object.defineProperty(exports, "TokenBurn", { enumerable: true, get: function () { return api_1.TokenBurn; } });
Object.defineProperty(exports, "TokenClass", { enumerable: true, get: function () { return api_1.TokenClass; } });
Object.defineProperty(exports, "TokenClassKey", { enumerable: true, get: function () { return api_1.TokenClassKey; } });
Object.defineProperty(exports, "TokenHold", { enumerable: true, get: function () { return api_1.TokenHold; } });
Object.defineProperty(exports, "TokenInstanceKey", { enumerable: true, get: function () { return api_1.TokenInstanceKey; } });
const bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
// Unique case where we need to expose private properties but keep validations
class TokenBalance {
}
exports.TokenBalance = TokenBalance;
tslib_1.__decorate([
    (0, api_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenBalance.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBalance.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBalance.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBalance.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenBalance.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, api_1.BigNumberArrayProperty)(),
    tslib_1.__metadata("design:type", Array)
], TokenBalance.prototype, "instanceIds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => api_1.TokenHold),
    tslib_1.__metadata("design:type", Array)
], TokenBalance.prototype, "lockedHolds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => api_1.TokenHold),
    tslib_1.__metadata("design:type", Array)
], TokenBalance.prototype, "inUseHolds", void 0);
tslib_1.__decorate([
    (0, api_1.BigNumberIsNotNegative)(),
    (0, api_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], TokenBalance.prototype, "quantity", void 0);
//# sourceMappingURL=tokenApi.js.map