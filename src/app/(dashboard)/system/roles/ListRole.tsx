import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import Link from "next/link";

import { Chip, IconButton, Skeleton, Tooltip } from "@mui/material";
import { Role } from "@/types/role";
import { Dispatch, SetStateAction } from "react";
import { User } from "@/types/auth";
import { hasPermission } from "@/utils/permissions";
import { Can } from "@/context/casl/AbilityContext";

export default function ListRole({
  rolePermissions,
  setSelectedRoleId,
  setOpenConfirmDelete,
  user,
}: {
  rolePermissions: Role[] | null;
  setSelectedRoleId: Dispatch<SetStateAction<string | null>>;
  setOpenConfirmDelete: Dispatch<SetStateAction<boolean>>;
  user: User | null;
}) {
  if (!rolePermissions) {
    return (
      <>
        {Array.from({ length: 10 }).map((_, index) => (
          <tr key={index} className="border-t-[1px] border-t-gray-300">
            <td className="p-2">
              <Skeleton variant="text" width={30} />
            </td>
            <td className="p-2">
              <Skeleton variant="text" width="70%" />
            </td>
            <td className="p-2">
              <Skeleton variant="text" width="80%" />
            </td>
            <td className="p-2">
              <Skeleton variant="text" width="100%" />
            </td>
            <td className="p-2 flex justify-center">
              <Skeleton variant="rounded" width={60} height={30} />
            </td>
            <td className="p-2 text-center">
              <div className="flex justify-center gap-2">
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  }
  return (
    <>
      {rolePermissions?.map((role, index) => (
        <tr key={role._id} className="border-t-[1px] border-t-gray-300">
          <td className="p-2 text-left">{index + 1}</td>
          <td className="p-2 text-left text-[14px] font-semibold">{role.name}</td>
          <td className="p-2 text-left max-w-48">
            <p className="text-ellipsis line-clamp-2">{role.description}</p>
          </td>
          <td className="p-2 text-center">
            {role.isActive ? (
              <Chip label="Active" color="success" variant="filled" />
            ) : (
              <Chip label="Inactive" color="error" variant="filled" />
            )}
          </td>
          <td className="p-2 text-center flex items-center justify-center">
            {hasPermission(user, "get roles by id") && (
              <Tooltip title="View" arrow>
                <Link href={`/role/${role._id}`}>
                  <IconButton color="primary">
                    <IoEye />
                  </IconButton>
                </Link>
              </Tooltip>
            )}
            <Can I="patch" a="roles/:id">
              <Tooltip title="Edit" arrow>
                <IconButton color="warning">
                  <FaRegEdit />
                </IconButton>
              </Tooltip>
            </Can>
            <Can I="delete" a="roles/:id">
              <Tooltip title="Delete" arrow>
                <IconButton
                  color="error"
                  onClick={() => {
                    setSelectedRoleId(role._id);
                    setOpenConfirmDelete(true);
                  }}
                >
                  <MdDelete />
                </IconButton>
              </Tooltip>
            </Can>
          </td>
        </tr>
      ))}
    </>
  );
}
