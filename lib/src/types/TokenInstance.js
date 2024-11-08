"use strict";
var TokenInstanceKey_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenInstance = exports.TokenInstanceQueryKey = exports.TokenInstanceQuantity = exports.TokenInstanceKey = void 0;
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
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const ChainObject_1 = require("./ChainObject");
const TokenClass_1 = require("./TokenClass");
const dtos_1 = require("./dtos");
let TokenInstanceKey = TokenInstanceKey_1 = class TokenInstanceKey extends dtos_1.ChainCallDTO {
    static nftKey(c, instance) {
        const instanceKey = new TokenInstanceKey_1();
        instanceKey.collection = c.collection;
        instanceKey.category = c.category;
        instanceKey.type = c.type;
        instanceKey.additionalKey = c.additionalKey;
        instanceKey.instance = new bignumber_js_1.BigNumber(instance);
        return instanceKey;
    }
    static fungibleKey(c) {
        return TokenInstanceKey_1.nftKey(c, TokenInstance.FUNGIBLE_TOKEN_INSTANCE);
    }
    getTokenClassKey() {
        const returnKey = new TokenClass_1.TokenClassKey();
        returnKey.category = this.category;
        returnKey.collection = this.collection;
        returnKey.type = this.type;
        returnKey.additionalKey = this.additionalKey;
        return returnKey;
    }
    toQueryKey() {
        const queryKey = new TokenInstanceQueryKey();
        queryKey.collection = this.collection;
        queryKey.category = this.category;
        queryKey.type = this.type;
        queryKey.additionalKey = this.additionalKey;
        queryKey.instance = this.instance;
        return queryKey;
    }
    toString() {
        return this.toStringKey();
    }
    toStringKey() {
        const keyList = TokenInstance.buildInstanceKeyList(this);
        return ChainObject_1.ChainObject.getStringKeyFromParts(keyList);
    }
    isFungible() {
        return TokenInstance.isFungible(this.instance);
    }
};
exports.TokenInstanceKey = TokenInstanceKey;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenInstanceKey.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenInstanceKey.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenInstanceKey.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenInstanceKey.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenInstanceKey.prototype, "instance", void 0);
exports.TokenInstanceKey = TokenInstanceKey = TokenInstanceKey_1 = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Object representing the chain identifier of token instance."
    })
], TokenInstanceKey);
class TokenInstanceQuantity extends dtos_1.ChainCallDTO {
    getTokenClassKey() {
        return this.tokenInstance.getTokenClassKey();
    }
    toString() {
        return this.tokenInstance.toStringKey();
    }
    toStringKey() {
        return this.tokenInstance.toStringKey();
    }
}
exports.TokenInstanceQuantity = TokenInstanceQuantity;
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenInstanceKey)
], TokenInstanceQuantity.prototype, "tokenInstance", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenInstanceQuantity.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The TokenClass metadata corresponding to the TokenBalance on this DTO."
    }),
    (0, class_transformer_1.Type)(() => TokenClass_1.TokenClass),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", TokenClass_1.TokenClass)
], TokenInstanceQuantity.prototype, "tokenMetadata", void 0);
let TokenInstanceQueryKey = class TokenInstanceQueryKey extends dtos_1.ChainCallDTO {
    isCompleteKey() {
        // for feature parity and transformation to TokenInstanceKey for compatibility with existing chain calls
        return !!(this.collection &&
            this.category &&
            this.type &&
            typeof this.additionalKey === "string" &&
            bignumber_js_1.BigNumber.isBigNumber(this.instance));
    }
    toCompleteKey() {
        // a TokenInstanceKey can always convert to a TokenQueryKey,
        // but a query key must have all required properties to convert to a TokenInstanceKey
        if (!(this.collection &&
            this.category &&
            this.type &&
            typeof this.additionalKey === "string" &&
            bignumber_js_1.BigNumber.isBigNumber(this.instance))) {
            throw new Error(`Attempted to convert partial key to complete instance key with missing properties: ${this.toQueryParams().join(", ")}`);
        }
        const instanceKey = new TokenInstanceKey();
        instanceKey.collection = this.collection;
        instanceKey.category = this.category;
        instanceKey.type = this.type;
        instanceKey.additionalKey = this.additionalKey;
        instanceKey.instance = this.instance;
        return instanceKey;
    }
    publicKeyProperties() {
        // key properties, in order, to support partial key construction.
        // fabric permits partial keys, in order of specificity, with no gaps.
        // e.g. if "type" is undefined, "additionalKey" must not be specified.
        return ["collection", "category", "type", "additionalKey"];
    }
    toQueryParams() {
        const queryParams = [];
        const publicKeyProperties = this.publicKeyProperties();
        for (const property of publicKeyProperties) {
            if (typeof this[property] !== "string") {
                break;
            }
            queryParams.push(this[property]);
        }
        return queryParams;
    }
};
exports.TokenInstanceQueryKey = TokenInstanceQueryKey;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenInstanceQueryKey.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], TokenInstanceQueryKey.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], TokenInstanceQueryKey.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], TokenInstanceQueryKey.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenInstanceQueryKey.prototype, "instance", void 0);
exports.TokenInstanceQueryKey = TokenInstanceQueryKey = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "A full or partial key of a TokenInstance, for querying or actioning one or more instances of a token."
    })
], TokenInstanceQueryKey);
class TokenInstance extends ChainObject_1.ChainObject {
    // This returns the unique identifying string used in the composite key for querying HLF
    GetCompositeKeyString() {
        return TokenInstance.CreateCompositeKey(this);
    }
    static GetFungibleInstanceFromClass(token) {
        const { MIN_UNICODE_RUNE_VALUE } = ChainObject_1.ChainObject;
        const { collection, category, type, additionalKey } = token;
        return [collection, category, type, additionalKey, this.FUNGIBLE_TOKEN_INSTANCE].join(MIN_UNICODE_RUNE_VALUE);
    }
    // This returns the unique identifying string used in the composite key for querying HLF
    static CreateCompositeKey(token) {
        const { MIN_UNICODE_RUNE_VALUE } = ChainObject_1.ChainObject;
        const { collection, category, type, additionalKey, instance } = (0, class_transformer_1.classToPlain)(token);
        return [collection, category, type, additionalKey, instance].join(MIN_UNICODE_RUNE_VALUE);
    }
    // This parses a string into the key that can be used to query HLF
    // This looks to be built to only handle the key to be composed of two parts and seperated by a |
    static GetCompositeKeyFromString(tokenCid) {
        const idParts = tokenCid.split(ChainObject_1.ChainObject.ID_SPLIT_CHAR);
        // We expect two parts, and for the second one to be a number
        if (idParts.length !== 2 || Number.isNaN(Number.parseInt(idParts[1]))) {
            throw new Error(`Invalid string passed to TokenInstance.GetCompositeKeyFromString : ${tokenCid}`);
        }
        else {
            return ChainObject_1.ChainObject.getCompositeKeyFromParts(TokenInstance.INDEX_KEY, idParts);
        }
    }
    static buildInstanceKeyList(token) {
        const { collection, category, type, additionalKey, instance } = token;
        return [collection, category, type, additionalKey, instance.toString()];
    }
    static async buildInstanceKeyObject(token) {
        var _a, _b, _c, _d, _e;
        const tokenInstanceKey = new TokenInstanceKey();
        tokenInstanceKey.collection = (_a = token === null || token === void 0 ? void 0 : token.collection) !== null && _a !== void 0 ? _a : null;
        tokenInstanceKey.category = (_b = token === null || token === void 0 ? void 0 : token.category) !== null && _b !== void 0 ? _b : null;
        tokenInstanceKey.type = (_c = token === null || token === void 0 ? void 0 : token.type) !== null && _c !== void 0 ? _c : null;
        tokenInstanceKey.additionalKey = (_d = token === null || token === void 0 ? void 0 : token.additionalKey) !== null && _d !== void 0 ? _d : null;
        tokenInstanceKey.instance = (_e = token === null || token === void 0 ? void 0 : token.instance) !== null && _e !== void 0 ? _e : null;
        const instanceValidationErrors = await tokenInstanceKey.validate();
        if (instanceValidationErrors.length !== 0) {
            throw new Error(instanceValidationErrors.join(". "));
        }
        return tokenInstanceKey;
    }
    static isFungible(instanceId) {
        return TokenInstance.FUNGIBLE_TOKEN_INSTANCE.isEqualTo(instanceId);
    }
    static isNFT(instanceId) {
        return !TokenInstance.isFungible(instanceId);
    }
}
exports.TokenInstance = TokenInstance;
TokenInstance.INDEX_KEY = "GCTI2";
TokenInstance.FUNGIBLE_TOKEN_INSTANCE = new bignumber_js_1.BigNumber(0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenInstance.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenInstance.prototype, "category", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenInstance.prototype, "type", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 3 }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenInstance.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 4 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenInstance.prototype, "instance", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenInstance.prototype, "isNonFungible", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateIf)((i) => i.isNonFungible === true),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenInstance.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", String)
], TokenInstance.prototype, "GetCompositeKeyString", null);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", String)
], TokenInstance, "GetFungibleInstanceFromClass", null);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", String)
], TokenInstance, "CreateCompositeKey", null);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", String)
], TokenInstance, "GetCompositeKeyFromString", null);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Array)
], TokenInstance, "buildInstanceKeyList", null);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenInstance, "buildInstanceKeyObject", null);
//# sourceMappingURL=TokenInstance.js.map