"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeChannelPaymentReceipt = void 0;
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
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const ChainObject_1 = require("./ChainObject");
const FeeReceiptStatus_1 = require("./FeeReceiptStatus");
// Channel receipt. Indexed time-first, lookup by distribution period.
class FeeChannelPaymentReceipt extends ChainObject_1.ChainObject {
}
exports.FeeChannelPaymentReceipt = FeeChannelPaymentReceipt;
FeeChannelPaymentReceipt.INDEX_KEY = "GCFR"; // FR = Fee Receipt
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FeeChannelPaymentReceipt.prototype, "year", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FeeChannelPaymentReceipt.prototype, "month", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FeeChannelPaymentReceipt.prototype, "day", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 3 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FeeChannelPaymentReceipt.prototype, "feeCode", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 4 }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], FeeChannelPaymentReceipt.prototype, "paidByUser", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 5 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FeeChannelPaymentReceipt.prototype, "txId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], FeeChannelPaymentReceipt.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, validators_1.EnumProperty)(FeeReceiptStatus_1.FeeReceiptStatus),
    tslib_1.__metadata("design:type", Number)
], FeeChannelPaymentReceipt.prototype, "status", void 0);
//# sourceMappingURL=FeeChannelPaymentReceipt.js.map