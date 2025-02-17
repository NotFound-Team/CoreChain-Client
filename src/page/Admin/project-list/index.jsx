import { message } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import fetchAPI from "../../../services/fetchApi";
import { useEffect, useState } from "react";
import CreateProject from "./createProject";
import TableProject from "./TableProject";

const ProductList = () => {
  const [dataTask, setDataTask] = useState([]);
  const [managerLists, setManagerLists] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await fetchAPI("/auth/admin/projects");
        const managerList = await fetchAPI("/auth/admin/managers");
        setDataTask(data.data.data);
        setManagerLists(managerList.data.data);
      } catch (error) {
        message.open({
          type: "error",
          content: `${error}`,
        });
      }
    };
    fetchTask();
  }, []);
  const isDetailPage = location.pathname.includes("details");
  return (
    <>
      {!isDetailPage && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Project List</h3>
            <CreateProject managerList={managerLists} />
          </div>
          <TableProject data={dataTask} />
        </>
      )}
      <Outlet />
    </>
  );
};

export default ProductList;
