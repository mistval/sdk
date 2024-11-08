import { ChainCallDTO, DryRunDto, DryRunResultDto as DryRunResult, GetObjectDto, GetObjectHistoryDto, NonFunctionProperties } from "@gala-chain/api";
import { ConstructorArgs, PublicProperties } from "./utils";
type DryRunRequest = PublicProperties<ConstructorArgs<DryRunDto>>;
type GetObjectByKeyRequest = PublicProperties<ConstructorArgs<GetObjectDto>>;
type GetObjectHistoryRequest = PublicProperties<ConstructorArgs<GetObjectHistoryDto>>;
export { DryRunRequest, DryRunResult, GetObjectByKeyRequest, GetObjectHistoryRequest, ChainCallDTO, NonFunctionProperties };
