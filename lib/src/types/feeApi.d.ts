import { FeeAuthorizationDto, FeeProperties, FeePropertiesDto, FeeAuthorizationResDto as FetchFeeAuthorizationsResponse, FetchFeePropertiesDto } from "@gala-chain/api";
import { ConstructorArgs } from "./utils";
type FeeAuthorizationRequest = ConstructorArgs<FeeAuthorizationDto>;
type FetchFeePropertiesRequest = ConstructorArgs<FetchFeePropertiesDto>;
type SetFeePropertiesRequest = ConstructorArgs<FeePropertiesDto>;
export { FeeAuthorizationRequest, FetchFeePropertiesRequest, SetFeePropertiesRequest, FeeProperties, FetchFeeAuthorizationsResponse };