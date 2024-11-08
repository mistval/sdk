"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenClaim = void 0;
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
const bignumber_js_1 = require("bignumber.js");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const ChainObject_1 = require("./ChainObject");
const common_1 = require("./common");
// A Token Claim is the other side of an allowance
// A person may have an allowance to do something,
// but it is not used and the token is not held until
// a claim is made
// This class is a prototype for future use.
// If we need to move away from the Balance approach
// where the Balance is updated with locks/uses then
// we will need to aggregate Claims to determine the
// usable balance
// TODO possible legacy, maybe we can use claims as an array in allowance
class TokenClaim extends ChainObject_1.ChainObject {
}
exports.TokenClaim = TokenClaim;
TokenClaim.INDEX_KEY = "GCTC";
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 0 }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenClaim.prototype, "ownerKey", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenClaim.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenClaim.prototype, "category", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 3 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenClaim.prototype, "type", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 4 }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenClaim.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 5 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenClaim.prototype, "instance", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 6 }),
    (0, validators_1.EnumProperty)(common_1.AllowanceType),
    tslib_1.__metadata("design:type", Number)
], TokenClaim.prototype, "action", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 7 }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenClaim.prototype, "issuerKey", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 8 }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], TokenClaim.prototype, "allowanceCreated", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 9 }),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenClaim.prototype, "claimSequence", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], TokenClaim.prototype, "created", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenClaim.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Object)
], TokenClaim, "INDEX_KEY", void 0);
//# sourceMappingURL=TokenClaim.js.map