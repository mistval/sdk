"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const elliptic_1 = require("elliptic");
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const dtos_1 = require("./dtos");
const getInstanceOrErrorInfo = async (constructor, jsonString) => {
    try {
        const deserialized = (0, class_transformer_1.plainToClass)(constructor, JSON.parse(jsonString)); // note: throws exception here if JSON is invalid
        const validationErrors = await deserialized.validate();
        if (validationErrors.length) {
            return (0, utils_1.getValidationErrorMessages)(validationErrors);
        }
        else {
            return deserialized;
        }
    }
    catch (e) {
        return e.message;
    }
};
const getPlainOrError = async (constructor, jsonString) => {
    const instance = await getInstanceOrErrorInfo(constructor, jsonString);
    return typeof instance === "string" ? instance : (0, class_transformer_1.classToPlain)(instance);
};
class TestDtoWithArray extends dtos_1.ChainCallDTO {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], TestDtoWithArray.prototype, "playerIds", void 0);
class TestDtoWithBigNumber extends dtos_1.ChainCallDTO {
}
tslib_1.__decorate([
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], TestDtoWithBigNumber.prototype, "quantity", void 0);
it("should parse TestDtoWithArray", async () => {
    const valid = '{"playerIds":["123"]}';
    const invalid1 = '{"playerIds":[]}';
    const invalid2 = '{"playerId":"aaa"}';
    const invalid3 = '{"invalid":"json';
    const failedArrayMatcher = expect.arrayContaining([
        "arrayMinSize: playerIds must contain at least 1 elements"
    ]);
    expect(await getPlainOrError(TestDtoWithArray, valid)).toEqual({ playerIds: ["123"] });
    expect(await getPlainOrError(TestDtoWithArray, invalid1)).toEqual(failedArrayMatcher);
    expect(await getPlainOrError(TestDtoWithArray, invalid2)).toEqual(failedArrayMatcher);
    expect(await getPlainOrError(TestDtoWithArray, invalid3)).toEqual("Unexpected end of JSON input");
});
it("should parse TestDtoWithBigNumber", async () => {
    const valid = '{"quantity":"123"}';
    const invalid1 = '{"quantity":123}';
    const invalid2 = '{"quantity":"123.10"}';
    const invalid3 = '{"quantity":"1.23e+5"}';
    const invalid4 = '{"quantity":"aaa"}';
    const expectedErrorPart = "should be a stringified number with fixed notation (not an exponential notation) " +
        "and no trailing zeros in decimal part";
    expect(await getInstanceOrErrorInfo(TestDtoWithBigNumber, valid)).toEqual({ quantity: new bignumber_js_1.default(123) });
    expect(await getInstanceOrErrorInfo(TestDtoWithBigNumber, invalid1)).toEqual([
        expect.stringContaining(`${expectedErrorPart} (valid value: 123)`)
    ]);
    expect(await getInstanceOrErrorInfo(TestDtoWithBigNumber, invalid2)).toEqual([
        expect.stringContaining(`${expectedErrorPart} (valid value: 123.1)`)
    ]);
    expect(await getInstanceOrErrorInfo(TestDtoWithBigNumber, invalid3)).toEqual([
        expect.stringContaining(`${expectedErrorPart} (valid value: 123000)`)
    ]);
    expect(await getInstanceOrErrorInfo(TestDtoWithBigNumber, invalid4)).toEqual([
        expect.stringContaining(expectedErrorPart)
    ]);
});
describe("ChainCallDTO", () => {
    class TestDto extends dtos_1.ChainCallDTO {
    }
    tslib_1.__decorate([
        (0, validators_1.BigNumberArrayProperty)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        tslib_1.__metadata("design:type", Array)
    ], TestDto.prototype, "amounts", void 0);
    function genKeyPair() {
        const pair = new elliptic_1.ec("secp256k1").genKeyPair();
        return {
            privateKey: pair.getPrivate().toString("hex"),
            publicKey: Buffer.from(pair.getPublic().encode("array", true)).toString("hex")
        };
    }
    it("should sign and verify signature", () => {
        // Given
        const { privateKey, publicKey } = genKeyPair();
        const dto = new TestDto();
        dto.amounts = [new bignumber_js_1.default("12.3")];
        expect(dto.signature).toEqual(undefined);
        // When
        dto.sign(privateKey);
        // Then
        expect(dto.signature).toEqual(expect.stringMatching(/.{50,}/));
        expect(dto.isSignatureValid(publicKey)).toEqual(true);
    });
    it("should sign and verify signature (edge case - shorter private key with missing trailing 0)", () => {
        // Given
        const privateKey = "e8d506db1e7c8d98dbc6752537939312702962f48e169084a7babbb5c96217f";
        const publicKey = "0365bc56f0a623867746cbb025a74c295b5f794cf7c4adc11991bad1522912e5f6";
        expect(privateKey.length).toEqual(63); // shorter than regular 64 one
        const dto = new TestDto();
        dto.amounts = [new bignumber_js_1.default("12.3")];
        expect(dto.signature).toEqual(undefined);
        // When
        dto.sign(privateKey);
        // Then
        expect(dto.signature).toEqual(expect.stringMatching(/.{50,}/));
        expect(dto.isSignatureValid(publicKey)).toEqual(true);
    });
    it("should sign and fail to verify signature (invalid key)", () => {
        // Given
        const { privateKey } = genKeyPair();
        const invalid = genKeyPair();
        const dto = new TestDto();
        dto.amounts = [new bignumber_js_1.default("12.3")];
        // When
        dto.sign(privateKey);
        // Then
        expect(dto.isSignatureValid(invalid.publicKey)).toEqual(false);
    });
    it("should sign and fail to verify signature (invalid payload)", () => {
        // Given
        const { privateKey, publicKey } = genKeyPair();
        const dto = new TestDto();
        dto.amounts = [new bignumber_js_1.default("12.3")];
        // When
        dto.sign(privateKey);
        dto.key = "i-will-break-this";
        // Then
        expect(dto.isSignatureValid(publicKey)).toEqual(false);
    });
});
//# sourceMappingURL=dtos.spec.js.map