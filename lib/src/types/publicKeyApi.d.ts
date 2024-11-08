import { RegisterEthUserDto, RegisterUserDto, UpdatePublicKeyDto } from "@gala-chain/api";
import { ConstructorArgs } from "./utils";
type RegisterUserRequest = ConstructorArgs<RegisterUserDto>;
type RegisterEthUserRequest = ConstructorArgs<RegisterEthUserDto>;
type UpdatePublicKeyRequest = ConstructorArgs<UpdatePublicKeyDto>;
export { RegisterUserRequest, RegisterEthUserRequest, UpdatePublicKeyRequest };
