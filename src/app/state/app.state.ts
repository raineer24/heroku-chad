import { UsersState } from "../admin/state/user.reducer";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export interface State {
  users: UsersState;
}
