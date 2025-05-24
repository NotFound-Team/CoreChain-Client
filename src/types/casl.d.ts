import { Ability } from "@casl/ability";

export type Actions = "get" | "post" | "patch" | "delete";
export type Subjects =
  | "users"
  | "users/:id"
  | "tasks"
  | "tasks/:id"
  | "projects"
  | "projects/:id"
  | "permissions"
  | "departments"
  | "departments/:id"
  | "positions"
  | "positions/:id"
  | "roles"
  | "roles/:id"
  | "all";

export type AppAbility = Ability<[Actions, Subjects]>;
