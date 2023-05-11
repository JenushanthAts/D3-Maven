const login = async (data) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_NOT_SECRET_CODE}/auth/login`,
      settings
    );
    const responseData = await fetchResponse.json();
    if (!fetchResponse.ok) {
      const errorMessage = responseData.error || "Login request failed";
      throw new Error(errorMessage);
    }
    return responseData?.data;
  } catch (error) {
    const errorMessage = error.message || "Login failed";
    throw new Error(errorMessage);
  }
};

export const authService = { login };
