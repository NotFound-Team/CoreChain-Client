import { Table, Tag } from "antd";

const ListStaff = () => {
  const data = [
    {
      key: "1",
      name: "Mike",
      function: "Sell",
      status: "OFFLINE",
      employed: "24/04/18",
    },
    {
      key: "2",
      name: "John",
      function: "Tester",
      status: "ONLINE",
      employed: "23/04/18",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Function",
      dataIndex: "function",
      key: "function",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return (
          <>
            {record.status === "ONLINE" ? (
              <Tag color="#55acee">ONLINE</Tag>
            ) : (
              <Tag color="gray">OFFLINE</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Employed",
      dataIndex: "employed",
      key: "employed",
    },
  ];

  return (
    <>
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default ListStaff;
