import { FEATURES_ADMIN, TRASHES_ADMIN, TAB_PROFILE } from "../enums";
export type TYPE_SEARCH = "users" | "posts";
export type TYPE_FEATURES = keyof typeof FEATURES_ADMIN;
export type TYPE_TRASHES = keyof typeof TRASHES_ADMIN;
export type TYPE_TAB_PROFILE = keyof typeof TAB_PROFILE;
