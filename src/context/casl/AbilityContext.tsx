// components/context/casl/AbilityContext.tsx
"use client";

import { createContext } from "react";
import { AppAbility } from "@/types/casl";
import { createContextualCan } from "@casl/react";

// Đảm bảo AbilityContext được khởi tạo đúng cách
export const AbilityContext = createContext<AppAbility>(undefined!); // Không được khởi tạo undefined

// Tạo `Can` từ `AbilityContext` Consumer
export const Can = createContextualCan(AbilityContext.Consumer);
