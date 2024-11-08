"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringEnumProperty = exports.EnumProperty = exports.BigNumberArrayProperty = exports.BigNumberProperty = exports.ApplyConstructor = void 0;
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
require("reflect-metadata");
const decorators_1 = require("./decorators");
function ApplyConstructor(Constructor, fromTransformer, toTransformer) {
    return function Wrapper() {
        const type = (0, class_transformer_1.Type)(() => Constructor);
        const from = (0, class_transformer_1.Transform)(({ value }) => fromTransformer(value), {
            toClassOnly: true
        });
        const to = (0, class_transformer_1.Transform)(({ value }) => toTransformer(value), {
            toPlainOnly: true
        });
        // eslint-disable-next-line @typescript-eslint/ban-types
        return function (target, propertyKey) {
            type(target, propertyKey);
            from(target, propertyKey);
            to(target, propertyKey);
        };
    };
}
exports.ApplyConstructor = ApplyConstructor;
// create BigNumber object only if we have proper input that matches .toFixed()
const parseBigNumber = (value) => {
    if (typeof value === "string") {
        const bn = new bignumber_js_1.default(value);
        return bn.toFixed() === value ? bn : value;
    }
    else {
        return value;
    }
};
const BigNumberProperty = (opts) => {
    const type = (0, class_transformer_1.Type)(() => bignumber_js_1.default);
    const from = (0, class_transformer_1.Transform)(({ value }) => parseBigNumber(value), {
        toClassOnly: true
    });
    const to = (0, class_transformer_1.Transform)(({ value }) => value.toFixed(), {
        toPlainOnly: true
    });
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target, propertyKey) {
        type(target, propertyKey);
        from(target, propertyKey);
        to(target, propertyKey);
        (0, decorators_1.IsBigNumber)()(target, propertyKey);
        if (!(opts === null || opts === void 0 ? void 0 : opts.allowInfinity)) {
            (0, decorators_1.BigNumberIsNotInfinity)()(target, propertyKey);
        }
    };
};
exports.BigNumberProperty = BigNumberProperty;
exports.BigNumberArrayProperty = ApplyConstructor(bignumber_js_1.default, (values) => values.map((value) => parseBigNumber(value)), (values) => values.map((value) => value.toFixed()));
/*
 * Mark this field has enum value. Works only for standard enums (numbers as values).
 */
function EnumProperty(enumType, validationOptions) {
    // enum obj contains reverse mappings: {"0":"Use", ...,"Use":0, ...}
    const keysAndValues = Object.values(enumType);
    const values = keysAndValues.filter((v) => typeof v === "number").sort();
    const mappingInfo = values.map((v) => `${v} - ${enumType[v]}`).join(", ");
    return (0, class_validator_1.ValidateBy)({
        name: "enumProperty",
        constraints: [values, enumType, mappingInfo], // enumType and mappingInfo is added here to use this information outside this lib
        validator: {
            validate: (value, args) => {
                const possibleValues = args === null || args === void 0 ? void 0 : args.constraints[0];
                return !Array.isArray(possibleValues) || possibleValues.some((v) => v === value);
            },
            defaultMessage: (0, class_validator_1.buildMessage)((prefix) => `${prefix}$property must be one of the following values: $constraint1, where $constraint3`, validationOptions)
        }
    }, validationOptions);
}
exports.EnumProperty = EnumProperty;
/*
 * Mark this field has enum value. Works only for string enums (strings as values).
 */
function StringEnumProperty(enumType, validationOptions) {
    const values = Object.values(enumType).sort();
    return (0, class_validator_1.IsIn)(values, validationOptions);
}
exports.StringEnumProperty = StringEnumProperty;
//# sourceMappingURL=transform-decorators.js.map