import { type AppLoadContext, unstable_createContext } from "react-router";
import type { AuthSession } from "~/lib/auth-client";

export const adapterContext = unstable_createContext<AppLoadContext>();
export const authSessionContext = unstable_createContext<AuthSession>();
