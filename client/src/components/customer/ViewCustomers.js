import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { customerService } from "services/customerService";

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const fetchAllCustomers = async () => {
    try {
      const res = await customerService.fetchAllCustomers();
      setCustomers(res);
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    fetchAllCustomers();
  }, []);
  return (
    <Container className="mt-5">
      <Table striped="columns">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.mobileNo}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewCustomers;
