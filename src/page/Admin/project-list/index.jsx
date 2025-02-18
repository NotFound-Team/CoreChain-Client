import { message } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import fetchAPI from "../../../services/fetchApi";
import { useEffect, useState } from "react";
import CreateProject from "./createProject";
import TableProject from "./TableProject";

const ProductList = () => {
  const [dataProject, setDataProject] = useState([]);
  const [managerLists, setManagerLists] = useState([]);
  const location = useLocation();

  const fetchTask = async () => {
    try {
      const data = await fetchAPI("/auth/admin/projects");
      const managerList = await fetchAPI("/auth/admin/managers");
      console.log("OK");

      setDataProject(data.data.data);
      setManagerLists(managerList.data.data);
    } catch (error) {
      message.error(`${error}`);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleAddProject = (status) => {
    if (status !== 201) {
      return;
    }
    fetchTask();
  };

  const isDetailPage = location.pathname.includes("details");

  return (
    <>
      {!isDetailPage && (
        <>
          <div className="flex items-center justify-between mb-7">
            <h3 className="font-bold">Project List</h3>
            <CreateProject
              managerList={managerLists}
              onAddProject={handleAddProject}
            />
          </div>
          <TableProject data={dataProject} />
        </>
      )}
      <Outlet />
    </>
  );
};

export default ProductList;
