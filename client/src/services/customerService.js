const createCustomer = (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_NOT_SECRET_CODE}/auth/register`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle login response
        resolve(data.message);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const fetchAllCustomers = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_NOT_SECRET_CODE}/customer/fetchAll`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle login response
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const updateStatus = (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.REACT_APP_NOT_SECRET_CODE}/customer/${user._id}/updateStatus`,
      {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status: data }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle login response
        resolve(data.message);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const updatePassword = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const settings = {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_NOT_SECRET_CODE}/customer/${user._id}/updatePassword`,
      settings
    );
    const responseData = await fetchResponse.json();
    if (!fetchResponse.ok) {
      const errorMessage =
        responseData.error || "Update Password request failed";
      throw new Error(errorMessage);
    }
    return responseData?.data;
  } catch (error) {
    const errorMessage = error.message || "Error  occured";
    throw new Error(errorMessage);
  }
};
export const customerService = {
  createCustomer,
  fetchAllCustomers,
  updateStatus,
  updatePassword,
};
