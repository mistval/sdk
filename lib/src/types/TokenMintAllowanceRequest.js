"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMintAllowanceRequest = void 0;
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
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const ChainObject_1 = require("./ChainObject");
const RangedChainObject_1 = require("./RangedChainObject");
const TokenAllowance_1 = require("./TokenAllowance");
const TokenMintAllowance_1 = require("./TokenMintAllowance");
const common_1 = require("./common");
class TokenMintAllowanceRequest extends RangedChainObject_1.RangedChainObject {
    requestId() {
        const { collection, category, type, additionalKey, totalKnownMintAllowancesCount, created, grantedBy, grantedTo } = this;
        return ChainObject_1.ChainObject.getStringKeyFromParts([
            collection,
            category,
            type,
            additionalKey,
            totalKnownMintAllowancesCount.toString(),
            `${created}`,
            grantedBy,
            grantedTo
        ]);
    }
    fulfillmentKey() {
        const { collection, category, type, additionalKey, totalKnownMintAllowancesCount, created, grantedBy, grantedTo } = this;
        return ChainObject_1.ChainObject.getCompositeKeyFromParts(TokenMintAllowance_1.TokenMintAllowance.INDEX_KEY, [
            collection,
            category,
            type,
            additionalKey,
            totalKnownMintAllowancesCount.toString(),
            `${created}`,
            grantedBy,
            grantedTo
        ]);
    }
    fulfill(instance) {
        const { collection, category, type, additionalKey, totalKnownMintAllowancesCount, created, grantedBy, grantedTo, quantity, id, uses, expires } = this;
        const mintAllowanceEntry = new TokenMintAllowance_1.TokenMintAllowance();
        mintAllowanceEntry.collection = collection;
        mintAllowanceEntry.category = category;
        mintAllowanceEntry.type = type;
        mintAllowanceEntry.additionalKey = additionalKey;
        mintAllowanceEntry.totalKnownMintAllowancesAtRequest = totalKnownMintAllowancesCount;
        mintAllowanceEntry.grantedBy = grantedBy;
        mintAllowanceEntry.grantedTo = grantedTo;
        mintAllowanceEntry.created = created;
        mintAllowanceEntry.reqId = id;
        mintAllowanceEntry.quantity = quantity;
        const allowance = new TokenAllowance_1.TokenAllowance();
        allowance.grantedTo = grantedTo;
        allowance.collection = collection;
        allowance.category = category;
        allowance.type = type;
        allowance.additionalKey = additionalKey;
        allowance.instance = instance;
        allowance.allowanceType = common_1.AllowanceType.Mint;
        allowance.grantedBy = grantedBy;
        // todo: determine if using the created timestamp of the request is fine,
        // or if we need to use the timestamp of the fulfillment.
        allowance.created = created;
        allowance.uses = uses;
        allowance.usesSpent = new bignumber_js_1.BigNumber("0");
        allowance.expires = expires !== null && expires !== void 0 ? expires : 0;
        allowance.quantity = quantity;
        allowance.quantitySpent = new bignumber_js_1.BigNumber("0");
        return [mintAllowanceEntry, allowance];
    }
}
exports.TokenMintAllowanceRequest = TokenMintAllowanceRequest;
TokenMintAllowanceRequest.INDEX_KEY = "GCTMAR";
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintAllowanceRequest.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintAllowanceRequest.prototype, "category", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintAllowanceRequest.prototype, "type", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 3 }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenMintAllowanceRequest.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 4 }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenMintAllowanceRequest.prototype, "timeKey", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 5 }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenMintAllowanceRequest.prototype, "grantedTo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenMintAllowanceRequest.prototype, "totalKnownMintAllowancesCount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], TokenMintAllowanceRequest.prototype, "created", void 0);
tslib_1.__decorate([
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenMintAllowanceRequest.prototype, "grantedBy", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenMintAllowanceRequest.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], TokenMintAllowanceRequest.prototype, "state", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintAllowanceRequest.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenMintAllowanceRequest.prototype, "uses", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], TokenMintAllowanceRequest.prototype, "expires", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintAllowanceRequest.prototype, "epoch", void 0);
//# sourceMappingURL=TokenMintAllowanceRequest.js.map