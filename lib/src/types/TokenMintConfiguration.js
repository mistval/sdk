"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMintConfiguration = exports.BurnToMintConfiguration = exports.PostMintLockConfiguration = void 0;
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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const ChainObject_1 = require("./ChainObject");
/**
 * @description
 *
 * Configure properties that may be used in conjunction with
 * a `TokenMintConfiguration` to lock some percentage of
 * tokens minted as a post-mint action.
 *
 */
class PostMintLockConfiguration extends ChainObject_1.ChainObject {
}
exports.PostMintLockConfiguration = PostMintLockConfiguration;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], PostMintLockConfiguration.prototype, "lockName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], PostMintLockConfiguration.prototype, "lockAuthority", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], PostMintLockConfiguration.prototype, "expirationModifier", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1),
    tslib_1.__metadata("design:type", Number)
], PostMintLockConfiguration.prototype, "lockPercentage", void 0);
/**
 * @description
 *
 * Configure properties that may be used in conjunction with
 * a `TokenMintConfiguration` to specify a pre-mint or post-mint
 * burn of the token quantity being minted as part of the
 * mint action.
 */
class BurnToMintConfiguration extends ChainObject_1.ChainObject {
}
exports.BurnToMintConfiguration = BurnToMintConfiguration;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1),
    tslib_1.__metadata("design:type", Number)
], BurnToMintConfiguration.prototype, "burnPercentage", void 0);
/**
 * @description
 *
 * Configure mint configurations for specific token classes.
 * The chain key properties are expected to match a token
 * class.
 *
 * On mint actions, the `@GalaTransaction` decorator's
 * `before` and/or `after`
 * property can potentially be configured with custom functions
 * that will look for these configuration options.
 *
 * If present,  they can execute myriad additional actions
 * atomically with the mint, such as post-mint fees,
 * nft crafting (e.g. burn three common parts to assemble one rare) etc.
 *
 */
class TokenMintConfiguration extends ChainObject_1.ChainObject {
    validatePostProcessingTotals() {
        var _a, _b;
        const burnPercentage = (_a = this.postMintBurn) === null || _a === void 0 ? void 0 : _a.burnPercentage;
        const lockPercentage = (_b = this.postMintLock) === null || _b === void 0 ? void 0 : _b.lockPercentage;
        if (burnPercentage !== undefined) {
            const remainderPostBurn = 1 - burnPercentage;
            if (lockPercentage !== undefined && lockPercentage > remainderPostBurn) {
                throw new utils_1.ValidationFailedError(`TokenMintConfiguration specified a combined post-processing total ` +
                    `greater than 1 (100%): lockPercentage: ${lockPercentage}, burnPercentage: ${burnPercentage}`);
            }
        }
    }
}
exports.TokenMintConfiguration = TokenMintConfiguration;
TokenMintConfiguration.INDEX_KEY = "GCTMC"; // GalaChain Token Mint Configuration
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintConfiguration.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintConfiguration.prototype, "category", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintConfiguration.prototype, "type", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 3 }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenMintConfiguration.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BurnToMintConfiguration),
    tslib_1.__metadata("design:type", BurnToMintConfiguration)
], TokenMintConfiguration.prototype, "preMintBurn", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BurnToMintConfiguration),
    tslib_1.__metadata("design:type", BurnToMintConfiguration)
], TokenMintConfiguration.prototype, "postMintBurn", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PostMintLockConfiguration),
    tslib_1.__metadata("design:type", PostMintLockConfiguration)
], TokenMintConfiguration.prototype, "postMintLock", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TokenMintConfiguration.prototype, "validatePostProcessingTotals", null);
//# sourceMappingURL=TokenMintConfiguration.js.map