import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { UserFetch } from "./userfetch";
export interface User {
  id?: number;
  email?: string;
  password?: string;
  token?: string;
  // user_profile?: Array<any>;
  user_profile: EntityState<UserFetch>;
  bio?: string;
}
