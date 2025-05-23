// components/providers/ability-provider.tsx
"use client";

import { AbilityContext } from "@/context/casl/AbilityContext";
import { Actions, AppAbility, Subjects } from "@/types/casl";
import { Ability, AbilityBuilder } from "@casl/ability";
import { ReactNode, useEffect, useState } from "react";

type Permission = {
  method: string;
  apiPath: string;
};

type Props = {
  children: ReactNode;
  permissions: Permission[]; // Cập nhật kiểu dữ liệu cho permissions
};

export default function AbilityProvider({ children, permissions }: Props) {
  const [ability, setAbility] = useState<AppAbility>(new Ability());

  useEffect(() => {
    const { can, build } = new AbilityBuilder<AppAbility>(Ability);

    console.log(permissions);

    permissions.forEach((permission) => {
      const action = permission.method.toLowerCase(); // 'POST', 'GET', 'DELETE', ...
      const subject = permission.apiPath as Subjects; // Lấy apiPath
      can(action.toLowerCase() as Actions, subject); // Đảm bảo action và subject được định nghĩa chính xác

      // console.log("actions", action);
      // console.log("sub", subject)
    });

    console.log(build());

    setAbility(build());
  }, [permissions]);

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
}
