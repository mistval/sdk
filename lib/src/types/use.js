"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseTokenDto = exports.ReleaseTokenDto = void 0;
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
const TokenInstance_1 = require("./TokenInstance");
const dtos_1 = require("./dtos");
let ReleaseTokenDto = class ReleaseTokenDto extends dtos_1.ChainCallDTO {
};
exports.ReleaseTokenDto = ReleaseTokenDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance of token to be released."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenInstance_1.TokenInstanceKey)
], ReleaseTokenDto.prototype, "tokenInstance", void 0);
exports.ReleaseTokenDto = ReleaseTokenDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Describes an action to release a token that is in use."
    })
], ReleaseTokenDto);
let UseTokenDto = class UseTokenDto extends dtos_1.ChainCallDTO {
};
exports.UseTokenDto = UseTokenDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The current owner of tokens. If the value is missing, chaincode caller is used."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], UseTokenDto.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The user who is going to use token."
    }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], UseTokenDto.prototype, "inUseBy", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance of token to be used. In case of fungible tokens, tokenInstance.instance field " +
            `should be set to ${TokenInstance_1.TokenInstance.FUNGIBLE_TOKEN_INSTANCE}.`
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenInstance_1.TokenInstanceKey)
], UseTokenDto.prototype, "tokenInstance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The quantity of token units to be used."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], UseTokenDto.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Allowance ids to be used (optional)."
    }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], UseTokenDto.prototype, "useAllowances", void 0);
exports.UseTokenDto = UseTokenDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Describes an action to use a token."
    })
], UseTokenDto);
//# sourceMappingURL=use.js.map