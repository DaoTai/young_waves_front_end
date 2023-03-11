import { FEATURES_ADMIN, TRASHES_ADMIN } from "../enums";
export type TYPE_SEARCH = "users" | "posts";
export type TYPE_FEATURES = keyof typeof FEATURES_ADMIN;
export type TYPE_TRASHES = keyof typeof TRASHES_ADMIN;
