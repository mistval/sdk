"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UP_INDEX_KEY = exports.UserProfile = void 0;
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
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const validators_1 = require("../validators");
const ChainObject_1 = require("./ChainObject");
class UserProfile extends ChainObject_1.ChainObject {
}
exports.UserProfile = UserProfile;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "A unique identifier of the user. " +
            "It may have the following format: client|<id>, eth|<checksumed-eth-addr>, or ton|<ton-bounceable-addr>."
    }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "alias", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Eth address of the user.`
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateIf)((o) => !o.tonAddress),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "ethAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `TON address of the user.`
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateIf)((o) => !o.ethAddress),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "tonAddress", void 0);
exports.UP_INDEX_KEY = "GCUP";
//# sourceMappingURL=UserProfile.js.map