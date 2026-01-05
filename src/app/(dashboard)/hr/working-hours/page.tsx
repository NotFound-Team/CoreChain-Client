"use client";

import React, { useEffect, useState } from "react";
import { CONFIG_API } from "@/configs/api";
import fetchApi from "@/utils/fetchApi";
import { getWorkingHoursReport } from "@/services/report.service";
import { FiEdit2, FiSave, FiX, FiUsers, FiClock } from "react-icons/fi";
import FallbackSpinner from "@/components/fall-back";

interface IEmployee {
  _id: string;
  name: string;
  email: string;
  workingHours: number;
}

interface IDepartmentData {
  department: string;
  employees: IEmployee[];
}

const WorkingHoursPage = () => {
  const [reportData, setReportData] = useState<IDepartmentData[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  const loadData = async () => {
    setLoading(true);
    const res = await getWorkingHoursReport();
    if (res?.statusCode === 200) {
      setReportData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdate = async (employeeId: string) => {
    try {
      await fetchApi(CONFIG_API.PERSONNEL.WORKING_HOURS(employeeId), "PATCH", { workingHours: editValue });

      setEditingId(null);
      loadData();
      alert("Cập nhật thành công!");
    } catch (error: any) {
      alert("Lỗi: " + error.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">
      <FallbackSpinner />
    </div>;
  }

  return (
    <div className="px-6 py-10">
      {/* PAGE HEADER */}
      <div className="mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FiClock className="text-blue-600" />
          Báo cáo & cập nhật giờ làm việc
        </h1>
        <p className="text-gray-500 mt-2">Quản lý giờ làm việc của nhân viên theo từng phòng ban</p>
      </div>

      <div className="mx-auto space-y-10">
        {reportData.map((dept) => (
          <div key={dept.department} className="bg-white rounded-2xl shadow-sm border border-gray-100">
            {/* DEPARTMENT HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{dept.department}</h2>
                <p className="text-sm text-gray-500">Danh sách nhân viên</p>
              </div>

              <div className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                <FiUsers />
                {dept.employees.length} nhân viên
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-4 text-left">Nhân viên</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left w-40">Giờ làm</th>
                    <th className="px-6 py-4 text-right w-40">Thao tác</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {dept.employees.map((emp) => {
                    const isEditing = editingId === emp._id;

                    return (
                      <tr key={emp._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-800">{emp.name}</div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">{emp.email}</td>

                        <td className="px-6 py-4">
                          {isEditing ? (
                            <input
                              type="number"
                              autoFocus
                              value={editValue}
                              onChange={(e) => setEditValue(Number(e.target.value))}
                              className="w-28 rounded-lg border border-blue-400 px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-200"
                            />
                          ) : (
                            <span className="font-semibold text-gray-800">{emp.workingHours} giờ</span>
                          )}
                        </td>

                        <td className="px-6 py-4 text-right">
                          {isEditing ? (
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleUpdate(emp._id)}
                                className="inline-flex items-center gap-1.5 bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-600"
                              >
                                <FiSave />
                                Lưu
                              </button>

                              <button
                                onClick={() => setEditingId(null)}
                                className="inline-flex items-center gap-1.5 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-300"
                              >
                                <FiX />
                                Hủy
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingId(emp._id);
                                setEditValue(emp.workingHours);
                              }}
                              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium"
                            >
                              <FiEdit2 />
                              Sửa
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingHoursPage;
