"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMyProfileDto = exports.GetPublicKeyDto = exports.UpdatePublicKeyDto = exports.RegisterTonUserDto = exports.RegisterEthUserDto = exports.RegisterUserDto = exports.DryRunResultDto = exports.DryRunDto = exports.GetObjectHistoryDto = exports.GetObjectDto = exports.ChainCallDTO = exports.createAndSignValidDTO = exports.createValidDTO = exports.parseValidDTO = exports.validateDTO = void 0;
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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const utils_1 = require("../utils");
const validators_1 = require("../validators");
class DtoValidationFailedError extends utils_1.ValidationFailedError {
    constructor(errors) {
        const messages = (0, utils_1.getValidationErrorMessages)(errors);
        const messagesString = messages.map((s, i) => `(${i + 1}) ${s}`).join(", ");
        super(`DTO validation failed: ${messagesString}`, messages);
    }
}
const validateDTO = async (dto) => {
    const validationErrors = await dto.validate();
    if (validationErrors.length) {
        throw new DtoValidationFailedError(validationErrors);
    }
    else {
        return dto;
    }
};
exports.validateDTO = validateDTO;
/**
 * Parses JSON string and creates a Promise with valid DTO. Throws exception in case of validation errors.
 */
const parseValidDTO = async (constructor, jsonStringOrObj) => {
    const deserialized = ChainCallDTO.deserialize(constructor, jsonStringOrObj);
    await (0, exports.validateDTO)(deserialized);
    return deserialized;
};
exports.parseValidDTO = parseValidDTO;
/**
 * Creates valid DTO object from provided plain object. Throws exception in case of validation errors.
 */
const createValidDTO = async (constructor, plain) => {
    const instance = (0, class_transformer_1.plainToInstance)(constructor, plain);
    await (0, exports.validateDTO)(instance);
    return instance;
};
exports.createValidDTO = createValidDTO;
/**
 * Creates valid signed DTO object from provided plain object. Throws exception in case of validation errors.
 *
 * @deprecated Use `(await createValidDTO(...)).signed(...)` instead
 */
const createAndSignValidDTO = async (constructor, plain, privateKey) => {
    const instance = (0, class_transformer_1.plainToInstance)(constructor, plain);
    instance.sign(privateKey);
    await (0, exports.validateDTO)(instance);
    return instance;
};
exports.createAndSignValidDTO = createAndSignValidDTO;
/**
 * @description
 *
 * The base DTO (Data Transfer Object) class. Provides common properties and
 * methods for signing, uniqueness, validation, and serialization. All other DTOs in the
 * SDK extend from this base class. To implement custom a custom DTO, create a new class that
 * extends `ChainCallDTO`, and use the `class-validator` npm package to decorate
 * the properties of the new class.
 *
 * @remarks
 *
 * Additional details for specific properties of this class
 * are generated via the `class-validator-jsonschema` npm module and can either
 *  be viewed in the source code
 * or in the OpenAPI documentation served alongside GalaChain's API endpoints.
 */
class ChainCallDTO {
    validate() {
        return (0, class_validator_1.validate)(this);
    }
    async validateOrReject() {
        const validationErrors = await this.validate();
        if (validationErrors.length) {
            throw new DtoValidationFailedError(validationErrors);
        }
    }
    /**
     * @description
     *
     * Serialze this object to string in a determinsitic fashion.
     * See Hyperledger Fabric's documentation on
     * [JSON Determinism](https://hyperledger-fabric.readthedocs.io/en/release-2.5/chaincode4ade.html#json-determinism)
     * for more details.
     *
     * @returns string
     */
    serialize() {
        return (0, utils_1.serialize)(this);
    }
    /**
     * @description
     *
     * Instantiate a class instance from a serialized object using the provided `ClassConstructor`.
     *
     * @param constructor
     *
     * `ClassConstructor` that extends `ChainCallDTO`
     *
     * @param object
     *
     * serialized string or plain object to be instantiated via the provided `ClassConstructor`
     *
     * @returns
     *
     * An instantiated class created with the provided `ClassConstructor`
     */
    static deserialize(constructor, object) {
        return (0, utils_1.deserialize)(constructor, object);
    }
    sign(privateKey, useDer = false) {
        const keyBuffer = utils_1.signatures.normalizePrivateKey(privateKey);
        this.signature = useDer
            ? utils_1.signatures.getDERSignature(this, keyBuffer)
            : utils_1.signatures.getSignature(this, keyBuffer);
    }
    /**
     * Creates a signed copy of current object.
     */
    // note: previously it was typed as "typeof this", but it's failed randomly on compilation
    signed(privateKey, useDer = false) {
        const copied = (0, class_transformer_1.instanceToInstance)(this);
        copied.sign(privateKey, useDer);
        return copied;
    }
    isSignatureValid(publicKey) {
        var _a;
        return utils_1.signatures.isValid((_a = this.signature) !== null && _a !== void 0 ? _a : "", this, publicKey);
    }
}
exports.ChainCallDTO = ChainCallDTO;
ChainCallDTO.ENCODING = "base64";
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Unique key of the DTO. It is used to prevent double execution of the same transaction on chain. " +
            "The key is saved on chain and checked before execution. " +
            "If a DTO with already saved key is used in transaction, the transaction will fail with " +
            "UniqueTransactionConflict error, which is mapped to HTTP 409 Conflict error. " +
            "In case of the error, no changes are saved to chain state.\n" +
            "The key is generated by the caller and should be unique for each DTO. " +
            "You can use `nanoid` library, UUID scheme, or any tool to generate unique string keys."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], ChainCallDTO.prototype, "uniqueKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Signature of the DTO signed with caller's private key to be verified with user's public key saved on chain. " +
            "The 'signature' field is optional for DTO, but is required for a transaction to be executed on chain. \n" +
            "Please consult [GalaChain SDK documentation](https://github.com/GalaChain/sdk/blob/main/docs/authorization.md#signature-based-authorization) on how to create signatures."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ChainCallDTO.prototype, "signature", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Prefix for Metamask transaction signatures. " +
            "Necessary to format payloads correctly to recover publicKey from web3 signatures."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ChainCallDTO.prototype, "prefix", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Address of the user who signed the DTO. Typically Ethereum or TON address."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ChainCallDTO.prototype, "signerAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Public key of the user who signed the DTO."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ChainCallDTO.prototype, "signerPublicKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Signing scheme used for the signature. ` +
            `"${utils_1.SigningScheme.ETH}" for Ethereum, and "${utils_1.SigningScheme.TON}" for The Open Network are supported. ` +
            `Default: "${utils_1.SigningScheme.ETH}".`
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.StringEnumProperty)(utils_1.SigningScheme),
    tslib_1.__metadata("design:type", String)
], ChainCallDTO.prototype, "signing", void 0);
/**
 * @description
 *
 * Input for the `GetObjectByKey` chaincode method defined on the GalaContract class.
 */
class GetObjectDto extends ChainCallDTO {
}
exports.GetObjectDto = GetObjectDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], GetObjectDto.prototype, "objectId", void 0);
/**
 * @description
 *
 * Input for the `GetObjectByHistory` chaincode method defined on the GalaContract class.
 */
class GetObjectHistoryDto extends ChainCallDTO {
}
exports.GetObjectHistoryDto = GetObjectHistoryDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], GetObjectHistoryDto.prototype, "objectId", void 0);
/**
 * @description
 *
 * Input for the `DryRun` chaincode method defined on the GalaContract class.
 * Use a `DryRunDto` and the `DryRun` chaincode method to simulate the
 * execution of a chaincode contract method. The results of the `DryRun`
 * will not be written chain. Instead, the Read/Write set that would have resulted from
 * the transaction will be returned to the consuming client for analysis.
 *
 * @remarks
 *
 * Authorization is not checked for `DryRun` execution. This allows application,
 * administrative, game server identities etc. to simulate a transaction result
 * without prompting the end user to sign the input first. This helps avoid
 * replay attacks (as the unique id would not be written to chain in a DryRun)
 * and also allows applications to present certain outcomes to the end user
 * before they decide to sign and authorize the transaction.
 *
 * Example use case: Executing a `DryRun` on a given method, and then processing
 * the results for `FeeChannelPaymentReceipt` or `FeeUserPaymentReceipt` objects
 * can yield the exepcted/estimated fee prior to executing a transaction. The
 * estimated fee can then be presented to an end user for them to decide whether
 * or not they want to authorize the transaction.
 */
class DryRunDto extends ChainCallDTO {
}
exports.DryRunDto = DryRunDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], DryRunDto.prototype, "method", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], DryRunDto.prototype, "callerPublicKey", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => ChainCallDTO),
    tslib_1.__metadata("design:type", ChainCallDTO)
], DryRunDto.prototype, "dto", void 0);
/**
 * @description
 *
 * Data Transfer Object (DTO) representing the  results of a successful `DryRun` execution,
 * to be sent back to the  consuming client.
 */
class DryRunResultDto extends ChainCallDTO {
}
exports.DryRunResultDto = DryRunResultDto;
/**
 * @description
 *
 * Dto for secure method to save public keys for legacy users.
 * Method is called and signed by Curators
 */
let RegisterUserDto = class RegisterUserDto extends ChainCallDTO {
};
exports.RegisterUserDto = RegisterUserDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Id of user to save public key for.`
    }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], RegisterUserDto.prototype, "user", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "Public secp256k1 key (compact or non-compact, hex or base64)." }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], RegisterUserDto.prototype, "publicKey", void 0);
exports.RegisterUserDto = RegisterUserDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Dto for secure method to save public keys for legacy users. Method is called and signed by Curators`
    })
], RegisterUserDto);
/**
 * @description
 *
 * Dto for secure method to save public keys for Eth users.
 * Method is called and signed by Curators
 */
let RegisterEthUserDto = class RegisterEthUserDto extends ChainCallDTO {
};
exports.RegisterEthUserDto = RegisterEthUserDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "Public secp256k1 key (compact or non-compact, hex or base64)." }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], RegisterEthUserDto.prototype, "publicKey", void 0);
exports.RegisterEthUserDto = RegisterEthUserDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Dto for secure method to save public keys for Eth users. Method is called and signed by Curators`
    })
], RegisterEthUserDto);
/**
 * @description
 *
 * Dto for secure method to save public keys for TON users.
 * Method is called and signed by Curators
 */
let RegisterTonUserDto = class RegisterTonUserDto extends ChainCallDTO {
};
exports.RegisterTonUserDto = RegisterTonUserDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "TON user public key (Ed25519 in base64)." }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], RegisterTonUserDto.prototype, "publicKey", void 0);
exports.RegisterTonUserDto = RegisterTonUserDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Dto for secure method to save public keys for TON users. Method is called and signed by Curators`
    })
], RegisterTonUserDto);
class UpdatePublicKeyDto extends ChainCallDTO {
}
exports.UpdatePublicKeyDto = UpdatePublicKeyDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "For users with ETH signing scheme it is public secp256k1 key (compact or non-compact, hex or base64). " +
            "For users with TON signing scheme it is public Ed25519 key (base64)."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdatePublicKeyDto.prototype, "publicKey", void 0);
class GetPublicKeyDto extends ChainCallDTO {
}
exports.GetPublicKeyDto = GetPublicKeyDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Id of a public key holder. Optional field, by default caller's public key is returned.`
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], GetPublicKeyDto.prototype, "user", void 0);
class GetMyProfileDto extends ChainCallDTO {
}
exports.GetMyProfileDto = GetMyProfileDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], GetMyProfileDto.prototype, "signature", void 0);
//# sourceMappingURL=dtos.js.map