// lib/casl/use-ability.ts
"use client";

import { AbilityContext } from "@/context/casl/AbilityContext";
import { Actions, Subjects } from "@/types/casl";
import { useContext } from "react";
import { Subject } from "@casl/ability";

export const useAbility = () => {
  const ability = useContext(AbilityContext);

  return {
    can: (action: Actions, subject: Subject) => ability.can(action, subject as Subjects),
    cannot: (action: Actions, subject: Subject) => ability.cannot(action, subject as Subjects),
  };
};
