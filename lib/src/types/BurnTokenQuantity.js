"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BurnTokenQuantity = void 0;
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
const validators_1 = require("../validators");
const TokenInstance_1 = require("./TokenInstance");
class BurnTokenQuantity {
}
exports.BurnTokenQuantity = BurnTokenQuantity;
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenInstance_1.TokenInstanceKey)
], BurnTokenQuantity.prototype, "tokenInstanceKey", void 0);
tslib_1.__decorate([
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], BurnTokenQuantity.prototype, "quantity", void 0);
//# sourceMappingURL=BurnTokenQuantity.js.map