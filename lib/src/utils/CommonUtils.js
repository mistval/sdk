"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethereumToGalaChainAddress = exports.galaChainToEthereumAddress = exports.generateEIP712Value = exports.capitalizeFirstLetter = exports.generateEIP712Types = void 0;
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
const ethers_1 = require("ethers");
function generateEIP712Types(typeName, params) {
    const types = {};
    types[typeName] = [];
    function addField(name, fieldValue, parentTypeName, onlyGetType = false) {
        if (Array.isArray(fieldValue)) {
            //Take the type of the first element
            const type = addField(name, fieldValue[0], parentTypeName, true);
            if (!onlyGetType)
                types[parentTypeName].push({ name, type: (type !== null && type !== void 0 ? type : name) + "[]" });
        }
        else if (typeof fieldValue === "object" && fieldValue !== null) {
            if (types[name]) {
                throw new Error("Name collisions not yet supported");
            }
            types[name] = [];
            Object.entries(fieldValue).forEach(([key, value]) => {
                addField(key, value, name);
            });
            if (!onlyGetType)
                types[parentTypeName].push({ name, type: name });
        }
        else {
            let eipType;
            switch (typeof fieldValue) {
                case "string":
                    eipType = "string";
                    break;
                case "number":
                    eipType = "uint256";
                    break;
                case "boolean":
                    eipType = "bool";
                    break;
                default:
                    throw new Error(`Unsupported type, ${typeof fieldValue}, value: ${fieldValue}`);
            }
            if (onlyGetType) {
                return eipType;
            }
            else {
                types[parentTypeName].push({ name, type: eipType });
            }
        }
    }
    Object.entries(params).forEach(([key, value]) => {
        addField(key, value, typeName);
    });
    return types;
}
exports.generateEIP712Types = generateEIP712Types;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function generateEIP712Value(params) {
    const value = {};
    function addField(name, field) {
        if (Array.isArray(field) || (typeof field === "object" && field !== null)) {
            Object.entries(field).forEach(([key, val]) => {
                addField(`${name}${capitalizeFirstLetter(key)}`, val);
            });
        }
        else {
            value[name] = field;
        }
    }
    Object.entries(params).forEach(([key, field]) => {
        addField(key, field);
    });
    return value;
}
exports.generateEIP712Value = generateEIP712Value;
function galaChainToEthereumAddress(galaAddress) {
    return galaAddress ? (0, ethers_1.getAddress)(`0x${galaAddress.replace(/0x|eth\|/, "")}`) : "";
}
exports.galaChainToEthereumAddress = galaChainToEthereumAddress;
function ethereumToGalaChainAddress(ethereumAddress) {
    var _a;
    return (_a = ethereumAddress === null || ethereumAddress === void 0 ? void 0 : ethereumAddress.replace("0x", "eth|")) !== null && _a !== void 0 ? _a : "";
}
exports.ethereumToGalaChainAddress = ethereumToGalaChainAddress;
//# sourceMappingURL=CommonUtils.js.map