import { Col, Row } from "antd";

const Dashboard = () => {
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <div className="shadow-md rounded-lg bg-white px-[10px] py-[20px]">
            <p>Today’s Sales</p>
            <div className="text-2xl font-bold">
              $53,000
              <span className="text-sm font-extralight text-green-500">
                +30%
              </span>
            </div>
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <div className="shadow-md rounded-lg bg-white px-[10px] py-[20px]">
            <p>Today’s Users</p>
            <div className="text-2xl font-bold">
              3,200
              <span className="text-sm font-extralight text-green-500">
                +20%
              </span>
            </div>
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <div className="shadow-md rounded-lg bg-white px-[10px] py-[20px]">
            <p>New Clients</p>
            <div className="text-2xl font-bold">
              +1,200
              <span className="text-sm font-extralight text-red-500">
                -20%
              </span>
            </div>
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <div className="shadow-md rounded-lg bg-white px-[10px] py-[20px]">
            <p>New Orders</p>
            <div className="text-2xl font-bold">
            $13,200
              <span className="text-sm font-extralight text-green-500">
                +10%
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="mt-20">
        <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
          <div className="h-[400px] border-solid border-2 border-gray-400 bg-white px-[10px] py-[20px]">
            Box 5
          </div>
        </Col>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <div className="h-[400px] border-solid border-2 border-gray-400 bg-white px-[10px] py-[20px]">
            Box 6
          </div>
        </Col>
      </Row>

      <Row gutter={[20, 20]} className="mt-20">
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <div className="h-[400px] border-solid border-2 border-gray-400 bg-white px-[10px] py-[20px]">
            Box 7
          </div>
        </Col>
        <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
          <div className="h-[400px] border-solid border-2 border-gray-400 bg-white px-[10px] py-[20px]">
            Box 8
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="mt-20">
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <div className="h-[400px] border-solid border-2 border-gray-400 bg-white px-[10px] py-[20px]">
            Box 9
          </div>
        </Col>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <div className="h-[400px] border-solid border-2 border-gray-400 bg-white px-[10px] py-[20px]">
            Box 10
          </div>
        </Col>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <div className="h-[400px] border-solid border-2 border-gray-400 bg-white px-[10px] py-[20px]">
            Box 11
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
