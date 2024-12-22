import { Col, Row } from "antd";

const Dashboard = () => {
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <div className="border-solid border-2 border-gray-400 bg-white px-[10px] py-[20px]">
            Box 1
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <div className="border-solid border-2 border-gray-400 bg-white px-[10px] py-[20px]">
            Box 2
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <div className="border-solid border-2 border-gray-400 bg-white px-[10px] py-[20px]">
            Box 3
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <div className="border-solid border-2 border-gray-400 bg-white px-[10px] py-[20px]">
            Box 4
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
