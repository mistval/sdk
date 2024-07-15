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
import { UserProfile } from "@gala-chain/api";
import { ChainUser } from "@gala-chain/client";

export interface ChainUserWithRoles {
  identityKey: string;
  ethAddress: string;
  publicKey: string;
  privateKey: string;
  roles: string[] | undefined;
}

function user(string: string, roles: string[]): ChainUserWithRoles {
  const user = ChainUser.withRandomKeys(string);
  return {
    identityKey: user.identityKey,
    ethAddress: user.ethAddress,
    publicKey: user.publicKey,
    privateKey: user.privateKey,
    roles
  };
}

export default {
  admin: user("client|admin", [...UserProfile.ADMIN_ROLES]),
  testUser1: user("client|testUser1", [...UserProfile.DEFAULT_ROLES]),
  testUser2: user("client|testUser2", [...UserProfile.DEFAULT_ROLES]),
  testUser3: user("client|testUser3", [...UserProfile.DEFAULT_ROLES]),
  tokenHolder: user("client|tokenHolder", [...UserProfile.DEFAULT_ROLES]),
  attacker: user("client|maliciousUser", [...UserProfile.ADMIN_ROLES])
};
