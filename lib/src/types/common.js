"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MintRequestDto = exports.TokenMintStatus = exports.AllowanceKey = exports.AllowanceType = void 0;
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
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const validators_1 = require("../validators");
const dtos_1 = require("./dtos");
var AllowanceType;
(function (AllowanceType) {
    AllowanceType[AllowanceType["Use"] = 0] = "Use";
    AllowanceType[AllowanceType["Lock"] = 1] = "Lock";
    // Note: We may want to remove this in the future, as Spend is redundant with transfer allowance
    AllowanceType[AllowanceType["Spend"] = 2] = "Spend";
    AllowanceType[AllowanceType["Transfer"] = 3] = "Transfer";
    AllowanceType[AllowanceType["Mint"] = 4] = "Mint";
    AllowanceType[AllowanceType["Swap"] = 5] = "Swap";
    AllowanceType[AllowanceType["Burn"] = 6] = "Burn";
})(AllowanceType || (exports.AllowanceType = AllowanceType = {}));
let AllowanceKey = class AllowanceKey extends dtos_1.ChainCallDTO {
};
exports.AllowanceKey = AllowanceKey;
tslib_1.__decorate([
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], AllowanceKey.prototype, "grantedTo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AllowanceKey.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AllowanceKey.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AllowanceKey.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], AllowanceKey.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], AllowanceKey.prototype, "instance", void 0);
tslib_1.__decorate([
    (0, validators_1.EnumProperty)(AllowanceType),
    tslib_1.__metadata("design:type", Number)
], AllowanceKey.prototype, "allowanceType", void 0);
tslib_1.__decorate([
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], AllowanceKey.prototype, "grantedBy", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], AllowanceKey.prototype, "created", void 0);
exports.AllowanceKey = AllowanceKey = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Key fields that identity an existing TokenAllowance."
    })
], AllowanceKey);
var TokenMintStatus;
(function (TokenMintStatus) {
    TokenMintStatus[TokenMintStatus["Unknown"] = 0] = "Unknown";
    TokenMintStatus[TokenMintStatus["Minted"] = 1] = "Minted";
    TokenMintStatus[TokenMintStatus["PartiallyMinted"] = 2] = "PartiallyMinted";
    TokenMintStatus[TokenMintStatus["AllowanceTotalExceeded"] = 3] = "AllowanceTotalExceeded";
    TokenMintStatus[TokenMintStatus["SupplyTotalExceeded"] = 4] = "SupplyTotalExceeded";
    TokenMintStatus[TokenMintStatus["NullAdministrativePatchEntry"] = 5] = "NullAdministrativePatchEntry";
})(TokenMintStatus || (exports.TokenMintStatus = TokenMintStatus = {}));
// todo: with various other class definitions moving out of common.ts to fix circular dependencies,
// consider where a better home for this definition could be.
let MintRequestDto = class MintRequestDto {
    isTimeKeyValid() {
        try {
            new bignumber_js_1.default(this.timeKey);
            return true;
        }
        catch (e) {
            return false;
        }
    }
};
exports.MintRequestDto = MintRequestDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], MintRequestDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], MintRequestDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], MintRequestDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], MintRequestDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], MintRequestDto.prototype, "timeKey", void 0);
tslib_1.__decorate([
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], MintRequestDto.prototype, "totalKnownMintsCount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], MintRequestDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The owner of minted tokens. If the value is missing, chaincode caller is used."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], MintRequestDto.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(Optional). Specify the TokenAllowance on chain to use for this mint."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => AllowanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", AllowanceKey)
], MintRequestDto.prototype, "allowanceKey", void 0);
exports.MintRequestDto = MintRequestDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "Minimal property set represnting a mint request." })
], MintRequestDto);
//# sourceMappingURL=common.js.map