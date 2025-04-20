"use client";

import React, { useState, useEffect } from "react";
import { Checkbox, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import fetchApi from "@/utils/fetchApi";
import { MdExpandMore } from "react-icons/md";
import { CONFIG_API } from "@/configs/api";
import { GrDocumentUpdate } from "react-icons/gr";
import { TPermission } from "@/types/permission";
import { TRoleLayoutPermission } from "@/types/role";

export default function PermissionPage() {
  const [listPermissions, setListPermissions] = useState<TPermission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<TRoleLayoutPermission[]>([]);

  const groupedPermissions = listPermissions.reduce((acc, permission) => {
    const moduleName: string | undefined = permission.module;
    const name = permission.name;
    const _id = permission._id;

    if (!moduleName || !name || !_id) return acc;

    if (!acc[moduleName]) {
      acc[moduleName] = [];
    }

    acc[moduleName].push({
      _id,
      name,
    });

    return acc;
  }, {} as Record<string, { _id: string; name: string }[]>);

  useEffect(() => {
    const fecthPermission = async () => {
      const response = await fetchApi(`${CONFIG_API.PERMISSION}?current=1&pageSize=100`, "GET");
      if (response && response.statusCode === 200) {
        console.log("PERMISSION", response.data.result);
        setListPermissions(response.data.result);
      }
    };
    fecthPermission();
  }, []);

  useEffect(() => {
    const fecthRole = async () => {
      const response = await fetchApi(`${CONFIG_API.ROLE}`, "GET");
      if (response && response.statusCode === 200) {
        console.log("ROLE", response.data.result);
        setRolePermissions(response.data.result);
      }
    };
    fecthRole();
  }, []);

  const handleChange = (roleId: string, permissionId: string, checked: boolean) => {
    // console.log("roleId", roleId);
    // console.log("permissionId", permissionId);
    // console.log("checked", checked);

    setRolePermissions((prev) => {
      // Tạo một bản sao của `rolePermissions` để tránh việc trực tiếp thay đổi state
      const updatedRolePermissions = [...prev];

      // Tìm vị trí của vai trò trong danh sách `rolePermissions`
      const roleIndex = updatedRolePermissions.findIndex((role) => role._id === roleId);

      if (roleIndex === -1) return prev; // Nếu không tìm thấy vai trò, không làm gì

      // Cập nhật quyền cho vai trò ở đúng vị trí
      const role = updatedRolePermissions[roleIndex];
      const permissions = new Set(role.permissions); // Dùng Set để tránh trùng quyền
      // Thêm hoặc xóa quyền dựa trên trạng thái checkbox
      if (checked) {
        permissions.add(permissionId); // Nếu checked, thêm quyền
      } else {
        permissions.delete(permissionId); // Nếu unchecked, xóa quyền
      }
      // Cập nhật lại danh sách quyền cho vai trò
      updatedRolePermissions[roleIndex] = {
        ...role,
        permissions: Array.from(permissions),
      };
      return updatedRolePermissions; // Trả về state mới
    });
  };

  const columnCount = rolePermissions.length + 1;

  const handleUpdatePermission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRolePermissions = rolePermissions.map(({ _id, permissions }) => ({ _id, permissions }));
    try {
      for (const item of newRolePermissions) {
        await fetchApi(`${CONFIG_API.ROLE}/${item._id}`, "PATCH", { permissions: item.permissions });
      }
      console.log("OK");
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <>
      <div className="p-6">
        {/* Bảng tiêu đề */}

        <form onSubmit={handleUpdatePermission}>
          <div className="flex justify-end mb-4">
            <Button type="submit" variant="contained" startIcon={<GrDocumentUpdate />} color="success">
              Update permission
            </Button>
          </div>
          <div
            className="bg-gray-100 font-semibold text-gray-700 text-sm border border-gray-300 rounded-t-md grid"
            style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
          >
            <div className="p-3 text-left">Actions</div>
            {rolePermissions.map((role) => (
              <div key={role._id} className="p-3 text-center capitalize">
                {role.name}
              </div>
            ))}
          </div>

          {/* Accordion cho từng module */}
          <div className="border-x border-b border-gray-300 rounded-b-md divide-y">
            {Object.entries(groupedPermissions).map(([moduleName, permissions], index) => (
              <Accordion key={index} disableGutters className="!shadow-none !border-0 !rounded-none" defaultExpanded>
                <AccordionSummary expandIcon={<MdExpandMore />} className="!bg-gray-50 hover:!bg-gray-100 px-3 py-2">
                  <span className="text-base font-bold text-gray-800">{moduleName}</span>
                </AccordionSummary>
                <AccordionDetails className="p-0">
                  {permissions.map((permission) => (
                    <div
                      key={permission._id}
                      className="grid items-center border-t border-gray-200 hover:bg-gray-50 text-sm"
                      style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
                    >
                      <div className="p-3">{permission.name}</div>
                      {rolePermissions.map((role) => (
                        <div key={role._id} className="flex justify-center items-center p-1">
                          <Checkbox
                            checked={role.permissions.includes(permission._id)}
                            onChange={(e) => handleChange(role._id, permission._id, e.target.checked)}
                            color="primary"
                            size="small"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </form>
      </div>
    </>
  );
}
