"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrantAllowanceQuantity = void 0;
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
const class_validator_1 = require("class-validator");
const validators_1 = require("../validators");
class GrantAllowanceQuantity {
}
exports.GrantAllowanceQuantity = GrantAllowanceQuantity;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], GrantAllowanceQuantity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, validators_1.BigNumberProperty)({ allowInfinity: true }),
    (0, validators_1.BigNumberIsNotNegative)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], GrantAllowanceQuantity.prototype, "quantity", void 0);
//# sourceMappingURL=GrantAllowance.js.map