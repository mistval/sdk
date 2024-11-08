"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenBurn = void 0;
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
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const ChainObject_1 = require("./ChainObject");
class TokenBurn extends ChainObject_1.ChainObject {
}
exports.TokenBurn = TokenBurn;
TokenBurn.INDEX_KEY = "GCTBR";
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 0 }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenBurn.prototype, "burnedBy", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurn.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurn.prototype, "category", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 3 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurn.prototype, "type", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 4 }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenBurn.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 5 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenBurn.prototype, "instance", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 6 }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], TokenBurn.prototype, "created", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenBurn.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Object)
], TokenBurn, "INDEX_KEY", void 0);
//# sourceMappingURL=TokenBurn.js.map