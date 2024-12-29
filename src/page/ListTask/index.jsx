import { useEffect, useState } from "react";
import TableTask from "./TableTask";
import fetchAPI from "../../services/fetchApi";
import { message } from "antd";
import CreateTask from "./CreateTask";

const ListTask = () => {
  const [dataTask, setDataTask] = useState([]);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await fetchAPI("/projects");
        setDataTask(data);
      } catch (error) {
        message.open({
          type: "error",
          content: `${error}`,
        });
      }
    };
    fetchTask();
  }, []);
  // console.log(dataTask);
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-bold">List Task</h3>
        <CreateTask />
      </div>
      <TableTask data={dataTask} />
    </>
  );
};

export default ListTask;
