"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenClass = exports.TokenClassKey = void 0;
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
const contract_1 = require("./contract");
const dtos_1 = require("./dtos");
let TokenClassKey = class TokenClassKey extends dtos_1.ChainCallDTO {
    toString() {
        return this.toStringKey();
    }
    toStringKey() {
        const keyList = TokenClass.buildClassKeyList(this);
        return ChainObject_1.ChainObject.getStringKeyFromParts(keyList);
    }
    static toStringKey(props) {
        const keyList = TokenClass.buildClassKeyList(props);
        return ChainObject_1.ChainObject.getStringKeyFromParts(keyList);
    }
    allKeysPresent() {
        const keysAndValues = Object.entries(this);
        if (keysAndValues.length !== 4)
            return false;
        const additionalKeyPresent = typeof this.additionalKey === "string";
        if (this.collection && this.category && this.type && additionalKeyPresent)
            return true;
        return false;
    }
};
exports.TokenClassKey = TokenClassKey;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenClassKey.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenClassKey.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenClassKey.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenClassKey.prototype, "additionalKey", void 0);
exports.TokenClassKey = TokenClassKey = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Object representing the chain identifier of token class."
    })
], TokenClassKey);
class TokenClass extends ChainObject_1.ChainObject {
    getKey() {
        return TokenClass.buildClassKeyObject(this);
    }
    static buildClassKeyList(tokenClassKey) {
        const { collection, category, type, additionalKey } = tokenClassKey;
        return [collection, category, type, additionalKey];
    }
    static buildTokenClassCompositeKey(tokenClassKey) {
        const partialClassObj = new TokenClass();
        partialClassObj.collection = tokenClassKey.collection;
        partialClassObj.category = tokenClassKey.category;
        partialClassObj.type = tokenClassKey.type;
        partialClassObj.additionalKey = tokenClassKey.additionalKey;
        return partialClassObj.getCompositeKey();
    }
    static async buildClassKeyObject(token) {
        var _a, _b, _c, _d;
        const tokenClassKey = new TokenClassKey();
        tokenClassKey.collection = (_a = token === null || token === void 0 ? void 0 : token.collection) !== null && _a !== void 0 ? _a : null;
        tokenClassKey.category = (_b = token === null || token === void 0 ? void 0 : token.category) !== null && _b !== void 0 ? _b : null;
        tokenClassKey.type = (_c = token === null || token === void 0 ? void 0 : token.type) !== null && _c !== void 0 ? _c : null;
        tokenClassKey.additionalKey = (_d = token === null || token === void 0 ? void 0 : token.additionalKey) !== null && _d !== void 0 ? _d : null;
        const instanceValidationErrors = await tokenClassKey.validate();
        if (instanceValidationErrors.length !== 0) {
            throw new Error(instanceValidationErrors.join(". "));
        }
        return tokenClassKey;
    }
    /**
     * Returns new token class object updated with properties that are allowed to be updated
     */
    updatedWith(toUpdate) {
        return createUpdated(this, toUpdate);
    }
}
exports.TokenClass = TokenClass;
TokenClass.INDEX_KEY = "GCTI";
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenClass.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenClass.prototype, "category", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenClass.prototype, "type", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 3 }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenClass.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Equals)(contract_1.GC_NETWORK_ID),
    tslib_1.__metadata("design:type", String)
], TokenClass.prototype, "network", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(32),
    tslib_1.__metadata("design:type", Number)
], TokenClass.prototype, "decimals", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenClass.prototype, "maxSupply", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenClass.prototype, "isNonFungible", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberProperty)({ allowInfinity: true }),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenClass.prototype, "maxCapacity", void 0);
tslib_1.__decorate([
    (0, validators_1.IsUserAlias)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], TokenClass.prototype, "authorities", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenClass.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsAlpha)(),
    tslib_1.__metadata("design:type", String)
], TokenClass.prototype, "symbol", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1000),
    tslib_1.__metadata("design:type", String)
], TokenClass.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    tslib_1.__metadata("design:type", String)
], TokenClass.prototype, "contractAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    tslib_1.__metadata("design:type", String)
], TokenClass.prototype, "metadataAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(500),
    tslib_1.__metadata("design:type", String)
], TokenClass.prototype, "image", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsAlpha)(),
    tslib_1.__metadata("design:type", String)
], TokenClass.prototype, "rarity", void 0);
tslib_1.__decorate([
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenClass.prototype, "totalBurned", void 0);
tslib_1.__decorate([
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenClass.prototype, "totalMintAllowance", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenClass.prototype, "knownMintAllowanceSupply", void 0);
tslib_1.__decorate([
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenClass.prototype, "totalSupply", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenClass.prototype, "knownMintSupply", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TokenClass.prototype, "getKey", null);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", String)
], TokenClass, "buildTokenClassCompositeKey", null);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenClass, "buildClassKeyObject", null);
function createUpdated(existingToken, toUpdate) {
    var _a, _b, _c, _d, _e, _f, _g;
    const newToken = (0, class_transformer_1.instanceToInstance)(existingToken);
    newToken.name = (_a = toUpdate.name) !== null && _a !== void 0 ? _a : existingToken.name;
    newToken.symbol = (_b = toUpdate.symbol) !== null && _b !== void 0 ? _b : existingToken.symbol;
    newToken.description = (_c = toUpdate.description) !== null && _c !== void 0 ? _c : existingToken.description;
    newToken.contractAddress = (_d = toUpdate.contractAddress) !== null && _d !== void 0 ? _d : existingToken.contractAddress;
    newToken.metadataAddress = (_e = toUpdate.metadataAddress) !== null && _e !== void 0 ? _e : existingToken.metadataAddress;
    newToken.rarity = (_f = toUpdate.rarity) !== null && _f !== void 0 ? _f : existingToken.rarity;
    newToken.image = (_g = toUpdate.image) !== null && _g !== void 0 ? _g : existingToken.image;
    if (Array.isArray(toUpdate.authorities) && toUpdate.authorities.length > 0) {
        newToken.authorities = toUpdate.overwriteAuthorities
            ? toUpdate.authorities
            : Array.from(new Set(newToken.authorities.concat(toUpdate.authorities))).sort();
    }
    return newToken;
}
//# sourceMappingURL=TokenClass.js.map