"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenBurnCounter = void 0;
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
const RangedChainObject_1 = require("./RangedChainObject");
class TokenBurnCounter extends RangedChainObject_1.RangedChainObject {
    referencedBurnId() {
        const { collection, category, type, additionalKey, burnedBy, created } = this;
        return ChainObject_1.ChainObject.getStringKeyFromParts([
            burnedBy,
            collection,
            category,
            type,
            additionalKey,
            burnedBy,
            `${created}`
        ]);
    }
}
exports.TokenBurnCounter = TokenBurnCounter;
TokenBurnCounter.INDEX_KEY = "GCTBRC";
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounter.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounter.prototype, "category", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounter.prototype, "type", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 3 }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounter.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 4 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounter.prototype, "timeKey", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 5 }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounter.prototype, "burnedBy", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 6 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenBurnCounter.prototype, "instance", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 7 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenBurnCounter.prototype, "totalKnownBurnsCount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], TokenBurnCounter.prototype, "created", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenBurnCounter.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounter.prototype, "referenceId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounter.prototype, "epoch", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", String)
], TokenBurnCounter.prototype, "referencedBurnId", null);
//# sourceMappingURL=TokenBurnCounter.js.map