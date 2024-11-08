"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangedChainObject = exports.InvalidRangedKeyError = void 0;
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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
require("reflect-metadata");
const utils_1 = require("../utils");
const ChainObject_1 = require("./ChainObject");
class InvalidRangedKeyError extends utils_1.ValidationFailedError {
    constructor(message) {
        super(message);
    }
}
exports.InvalidRangedKeyError = InvalidRangedKeyError;
class RangedChainObject {
    serialize() {
        return (0, utils_1.serialize)(this);
    }
    validate() {
        return (0, class_validator_1.validate)(this);
    }
    async validateOrReject() {
        const validationErrors = await this.validate();
        if (validationErrors.length) {
            throw new ChainObject_1.ObjectValidationFailedError(validationErrors);
        }
    }
    toPlainObject() {
        return (0, class_transformer_1.instanceToPlain)(this);
    }
    static deserialize(constructor, object) {
        return (0, utils_1.deserialize)(constructor, object);
    }
    getRangedKey() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore this is a way to access static property of current class
        const classIndexKey = this.__proto__.constructor.INDEX_KEY;
        if (classIndexKey === undefined) {
            throw new InvalidRangedKeyError(`getCompositeKey failed because of no INDEX_KEY on ${(0, utils_1.serialize)(this)}`);
        }
        const target = Object.getPrototypeOf(this);
        const fields = Reflect.getOwnMetadata("galachain:chainkey", target) || [];
        const plain = (0, class_transformer_1.instanceToPlain)(this);
        const keyParts = fields
            .sort((a, b) => a.position - b.position)
            .map((field) => {
            var _a, _b;
            const key = field.key.toString();
            return typeof ((_a = this[key]) === null || _a === void 0 ? void 0 : _a.toStringKey) === "function" ? (_b = this[key]) === null || _b === void 0 ? void 0 : _b.toStringKey() : plain[key];
        });
        return RangedChainObject.getRangedKeyFromParts(classIndexKey, keyParts);
    }
    static getRangedKeyFromParts(indexKey, parts) {
        for (const part of parts) {
            if (part === null ||
                part === undefined ||
                typeof part === "object" ||
                !(typeof part["toString"] === "function")) {
                throw new InvalidRangedKeyError(`Invalid part ${part} passed to getRangedKeyFromParts: ${parts.join(", ")}`);
            }
        }
        return indexKey + ChainObject_1.ChainObject.MIN_UNICODE_RUNE_VALUE + parts.join(ChainObject_1.ChainObject.MIN_UNICODE_RUNE_VALUE);
    }
    static getStringKeyFromParts(parts) {
        return `${parts.join(ChainObject_1.ChainObject.ID_SPLIT_CHAR)}`;
    }
}
exports.RangedChainObject = RangedChainObject;
//# sourceMappingURL=RangedChainObject.js.map