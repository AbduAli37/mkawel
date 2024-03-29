import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";

const Breadcrumbs = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">{props?.title}</h4>
            <div className="page-title-right">
              <Breadcrumb listClassName="m-0">
                <BreadcrumbItem>
                  <Link to="#">{props?.title}</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <Link to="#">{props?.breadcrumbItem}</Link>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}



export default Breadcrumbs;
