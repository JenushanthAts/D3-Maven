import { Router } from "express";
import {
  fetchAllCustomer,
  updateCustomerStatus,
  updatePassword,
} from "../controllers/customerController.js";

const customerRouter = Router();
customerRouter.get("/fetchAll", fetchAllCustomer); //http://localhost:5001/api/customer/fetchAll;
customerRouter.put("/:customerId/updateStatus", updateCustomerStatus); //http://localhost:5001/api/customer/customerId/updateStatus;
customerRouter.put("/:customerId/updatePassword", updatePassword); //http://localhost:5001/api/customer/customerId/updateStatus;

export default customerRouter;
