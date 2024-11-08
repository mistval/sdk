"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigNumberIsInteger = exports.BigNumberIsNotNegative = exports.BigNumberIsNotInfinity = exports.BigNumberIsPositive = exports.IsBigNumber = exports.ArrayUniqueObjects = exports.ArrayUniqueConcat = exports.IsDifferentValue = exports.IsWholeNumber = void 0;
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
const error_1 = require("../utils/error");
function IsWholeNumber(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isWholeNumber",
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    const num = Number(relatedValue);
                    return num - Math.floor(num) === 0;
                }
            }
        });
    };
}
exports.IsWholeNumber = IsWholeNumber;
function IsDifferentValue(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "IsDifferentValue",
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    if ((typeof value !== "string" && value !== undefined) ||
                        (typeof relatedValue !== "string" && relatedValue !== undefined)) {
                        throw new error_1.NotImplementedError("IsDifferentValue only works with string or undefined");
                    }
                    return value !== relatedValue;
                }
            }
        });
    };
}
exports.IsDifferentValue = IsDifferentValue;
function ArrayUniqueConcat(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "ArrayUniqueConcat",
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    // Cannot have tokens duplicated between from or to, or within the from or to itself
                    const totalUniques = new Set(relatedValue.concat(value)).size;
                    return totalUniques === relatedValue.length + value.length;
                }
            }
        });
    };
}
exports.ArrayUniqueConcat = ArrayUniqueConcat;
function ArrayUniqueObjects(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "ArrayUniqueObjects",
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value) {
                    if (Array.isArray(value)) {
                        const propertyValues = value.map((v) => (typeof v === "object" && !!v ? v[property] : undefined));
                        return new Set(propertyValues).size === value.length;
                    }
                    return false;
                },
                defaultMessage(args) {
                    return `${args.property} must not contains duplicate entry for ${args.constraints[0]}`;
                }
            }
        });
    };
}
exports.ArrayUniqueObjects = ArrayUniqueObjects;
function IsBigNumber(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "IsBigNumber",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return bignumber_js_1.default.isBigNumber(value);
                },
                defaultMessage(args) {
                    const bn = typeof args.value === "string" || typeof args.value === "number"
                        ? new bignumber_js_1.default(args.value)
                        : undefined;
                    const suggestion = bn && !bn.isNaN() ? ` (valid value: ${bn === null || bn === void 0 ? void 0 : bn.toFixed()})` : "";
                    return (`${args.property} should be a stringified number with fixed notation (not an exponential notation) ` +
                        `and no trailing zeros in decimal part${suggestion}`);
                }
            }
        });
    };
}
exports.IsBigNumber = IsBigNumber;
function validateBigNumberOrIgnore(obj, fn) {
    if (bignumber_js_1.default.isBigNumber(obj)) {
        return fn(obj);
    }
    else {
        return true;
    }
}
function BigNumberIsPositive(validationOptions) {
    return function (object, propertyName) {
        IsBigNumber(validationOptions)(object, propertyName);
        (0, class_validator_1.registerDecorator)({
            name: "BigNumberIsPositive",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return validateBigNumberOrIgnore(value, (b) => b.isPositive());
                },
                defaultMessage(args) {
                    var _a, _b;
                    // here you can provide default error message if validation failed
                    return `${args.property} must be positive but is ${(_b = (_a = args.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : args.value}`;
                }
            }
        });
    };
}
exports.BigNumberIsPositive = BigNumberIsPositive;
function BigNumberIsNotInfinity(validationOptions) {
    return function (object, propertyName) {
        IsBigNumber(validationOptions)(object, propertyName);
        (0, class_validator_1.registerDecorator)({
            name: "BigNumberIsNotInfinity",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return validateBigNumberOrIgnore(value, (b) => b.isFinite());
                },
                defaultMessage(args) {
                    var _a, _b;
                    // here you can provide default error message if validation failed
                    return `${args.property} must be finite BigNumber but is ${(_b = (_a = args.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : args.value}`;
                }
            }
        });
    };
}
exports.BigNumberIsNotInfinity = BigNumberIsNotInfinity;
function BigNumberIsNotNegative(validationOptions) {
    return function (object, propertyName) {
        IsBigNumber(validationOptions)(object, propertyName);
        (0, class_validator_1.registerDecorator)({
            name: "BigNumberIsNotNegative",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return validateBigNumberOrIgnore(value, (b) => !b.isNegative());
                },
                defaultMessage(args) {
                    var _a, _b;
                    // here you can provide default error message if validation failed
                    return `${args.property} must be non-negative BigNumber but is ${(_b = (_a = args.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : args.value}`;
                }
            }
        });
    };
}
exports.BigNumberIsNotNegative = BigNumberIsNotNegative;
function BigNumberIsInteger(validationOptions) {
    return function (object, propertyName) {
        IsBigNumber(validationOptions)(object, propertyName);
        (0, class_validator_1.registerDecorator)({
            name: "BigNumberIsInteger",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return validateBigNumberOrIgnore(value, (b) => b.isInteger());
                },
                defaultMessage(args) {
                    var _a, _b;
                    // here you can provide default error message if validation failed
                    return `${args.property} must be integer BigNumber but is ${(_b = (_a = args.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : args.value}`;
                }
            }
        });
    };
}
exports.BigNumberIsInteger = BigNumberIsInteger;
//# sourceMappingURL=decorators.js.map