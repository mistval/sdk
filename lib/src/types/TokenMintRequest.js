"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMintRequest = void 0;
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
const bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const ChainObject_1 = require("./ChainObject");
const RangedChainObject_1 = require("./RangedChainObject");
const TokenMintFulfillment_1 = require("./TokenMintFulfillment");
const common_1 = require("./common");
class TokenMintRequest extends RangedChainObject_1.RangedChainObject {
    isTimeKeyValid() {
        try {
            new bignumber_js_1.default(this.timeKey);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    requestId() {
        const { collection, category, type, additionalKey, totalKnownMintsCount, requestor, owner, created } = this;
        return ChainObject_1.ChainObject.getStringKeyFromParts([
            collection,
            category,
            type,
            additionalKey,
            totalKnownMintsCount.toString(),
            requestor,
            owner,
            `${created}`
        ]);
    }
    fulfillmentKey() {
        const { collection, category, type, additionalKey, totalKnownMintsCount, requestor, owner, created } = this;
        return ChainObject_1.ChainObject.getCompositeKeyFromParts(TokenMintFulfillment_1.TokenMintFulfillment.INDEX_KEY, [
            collection,
            category,
            type,
            additionalKey,
            totalKnownMintsCount.toString(),
            requestor,
            owner,
            `${created}`
        ]);
    }
    fulfill(qty) {
        const { collection, category, type, additionalKey, requestor, created, owner } = this;
        const mintFulfillment = new TokenMintFulfillment_1.TokenMintFulfillment();
        mintFulfillment.collection = collection;
        mintFulfillment.category = category;
        mintFulfillment.type = type;
        mintFulfillment.additionalKey = additionalKey;
        mintFulfillment.requestor = requestor;
        mintFulfillment.requestCreated = created;
        mintFulfillment.owner = owner;
        mintFulfillment.created = created;
        mintFulfillment.quantity = qty;
        if (qty.isLessThan(this.quantity)) {
            mintFulfillment.state = common_1.TokenMintStatus.PartiallyMinted;
        }
        else {
            mintFulfillment.state = common_1.TokenMintStatus.Minted;
        }
        mintFulfillment.id = this.requestId();
        return mintFulfillment;
    }
}
exports.TokenMintRequest = TokenMintRequest;
TokenMintRequest.INDEX_KEY = "GCTMR";
TokenMintRequest.OBJECT_TYPE = "TokenMintRequest"; // for contract.GetObjectsByPartialCompositeKey
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintRequest.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintRequest.prototype, "category", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintRequest.prototype, "type", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 3 }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenMintRequest.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 4 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintRequest.prototype, "timeKey", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 5 }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenMintRequest.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], TokenMintRequest.prototype, "totalKnownMintsCount", void 0);
tslib_1.__decorate([
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenMintRequest.prototype, "requestor", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], TokenMintRequest.prototype, "created", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], TokenMintRequest.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], TokenMintRequest.prototype, "state", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintRequest.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintRequest.prototype, "epoch", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => common_1.AllowanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", common_1.AllowanceKey)
], TokenMintRequest.prototype, "allowanceKey", void 0);
//# sourceMappingURL=TokenMintRequest.js.map