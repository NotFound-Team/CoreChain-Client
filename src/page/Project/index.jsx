import { useEffect, useState } from "react";
import TableTask from "./TableTask";
import fetchAPI from "../../services/fetchApi";
import { message } from "antd";
import CreateTask from "./CreateTask";
import { Outlet, useLocation } from "react-router-dom";

const Project = () => {
  const [dataTask, setDataTask] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await fetchAPI("/auth/manager/project"); 
        if (data.status === 200 || data.status === 204)
          setDataTask(data.data.data);
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
            <CreateTask />
          </div>
          <TableTask data={dataTask} />
        </>
      )}
      <Outlet />
    </>
  );
};

export default Project;
