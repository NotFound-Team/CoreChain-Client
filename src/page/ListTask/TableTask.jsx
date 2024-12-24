import { Badge, Card, Checkbox, Col, Row } from "antd";

const TableTask = () => {
  return (
    <>
      <Row gutter={[20,20]}>
        <Col span={6}>
          <Badge.Ribbon text="complete" color="green">
            <Card title={<div><Checkbox>Name Task</Checkbox></div>}>
              <p>Title task</p>
              <p>deadline: 28/01/2025</p>
            </Card>
          </Badge.Ribbon>
        </Col>
      </Row>
    </>
  )
}

export default TableTask;