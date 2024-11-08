"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlockTokensDto = exports.UnlockTokenDto = exports.LockTokensDto = exports.LockTokenDto = void 0;
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
const LockTokenQuantity_1 = require("./LockTokenQuantity");
const TokenInstance_1 = require("./TokenInstance");
const dtos_1 = require("./dtos");
let LockTokenDto = class LockTokenDto extends dtos_1.ChainCallDTO {
};
exports.LockTokenDto = LockTokenDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The current owner of tokens. If the value is missing, chaincode caller is used."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], LockTokenDto.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "User who will be able to unlock token. " +
            "If the value is missing, then token owner and lock creator can unlock " +
            "in all cases token authority can unlock token."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], LockTokenDto.prototype, "lockAuthority", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance of token to be locked. In case of fungible tokens, tokenInstance.instance field " +
            `should be set to ${TokenInstance_1.TokenInstance.FUNGIBLE_TOKEN_INSTANCE}.`
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenInstance_1.TokenInstanceKey)
], LockTokenDto.prototype, "tokenInstance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The quantity of token units to be locked."
    }),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], LockTokenDto.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Allowance ids to be used on lock (optional)."
    }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], LockTokenDto.prototype, "useAllowances", void 0);
exports.LockTokenDto = LockTokenDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Describes an action to lock a token."
    })
], LockTokenDto);
let LockTokensDto = class LockTokensDto extends dtos_1.ChainCallDTO {
};
exports.LockTokensDto = LockTokensDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "User who will be able to unlock token. " +
            "If the value is missing, then token owner and lock creator can unlock " +
            "in all cases token authority can unlock token."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], LockTokensDto.prototype, "lockAuthority", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Array of token instances of token to be locked. In case of fungible tokens, tokenInstance.instance field " +
            `should be set to ${TokenInstance_1.TokenInstance.FUNGIBLE_TOKEN_INSTANCE}.`
    }),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_transformer_1.Type)(() => LockTokenQuantity_1.LockTokenQuantity),
    (0, class_validator_1.ValidateNested)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], LockTokensDto.prototype, "tokenInstances", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Allowance ids to be used on lock (optional)."
    }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], LockTokensDto.prototype, "useAllowances", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Name for the token holds (optional). This name will be applied to all token holds created by this Lock."
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], LockTokensDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Expiration timestamp. The TokenHold will expire at this time. This name will be applied to all token holds created by this Lock."
    }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], LockTokensDto.prototype, "expires", void 0);
exports.LockTokensDto = LockTokensDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Describes an action to lock multiple tokens."
    })
], LockTokensDto);
let UnlockTokenDto = class UnlockTokenDto extends dtos_1.ChainCallDTO {
};
exports.UnlockTokenDto = UnlockTokenDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance of token to be unlocked."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenInstance_1.TokenInstanceKey)
], UnlockTokenDto.prototype, "tokenInstance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Optional quantity for unlocking fungible tokens. Not for use with NFT token instances."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.tokenInstance.instance === TokenInstance_1.TokenInstance.FUNGIBLE_TOKEN_INSTANCE),
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], UnlockTokenDto.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Optional. Owner of the token. Calling User by default. Usable by Token Authorities only."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], UnlockTokenDto.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Optional. name property of the lockedHold defined on the balance. undefined by default. Usable by Token Authorities only."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UnlockTokenDto.prototype, "lockedHoldName", void 0);
exports.UnlockTokenDto = UnlockTokenDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Describes an action to unlock a token."
    })
], UnlockTokenDto);
let UnlockTokensDto = class UnlockTokensDto extends dtos_1.ChainCallDTO {
};
exports.UnlockTokensDto = UnlockTokensDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Array of token instances of token to be locked. In case of fungible tokens, tokenInstance.instance field " +
            `should be set to ${TokenInstance_1.TokenInstance.FUNGIBLE_TOKEN_INSTANCE}.`
    }),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_transformer_1.Type)(() => LockTokenQuantity_1.LockTokenQuantity),
    (0, class_validator_1.ValidateNested)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], UnlockTokensDto.prototype, "tokenInstances", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Name for the token holds (optional). Only token holds with this name will be Unlocked if provided."
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UnlockTokensDto.prototype, "name", void 0);
exports.UnlockTokensDto = UnlockTokensDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Describes an action to unlock multiple tokens."
    })
], UnlockTokensDto);
//# sourceMappingURL=lock.js.map