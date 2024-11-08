"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePublicKey = exports.PK_INDEX_KEY = exports.PublicKey = void 0;
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
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const ChainObject_1 = require("./ChainObject");
class PublicKey extends ChainObject_1.ChainObject {
}
exports.PublicKey = PublicKey;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], PublicKey.prototype, "publicKey", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.StringEnumProperty)(utils_1.SigningScheme),
    tslib_1.__metadata("design:type", String)
], PublicKey.prototype, "signing", void 0);
exports.PK_INDEX_KEY = "GCPK";
function normalizePublicKey(input) {
    return utils_1.signatures.normalizePublicKey(input).toString("base64");
}
exports.normalizePublicKey = normalizePublicKey;
//# sourceMappingURL=PublicKey.js.map