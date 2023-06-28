import mem from "mem";
import axios from "axios";

const refreshTokenFn = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const response = await axios.post("/auth/refresh", {
      refreshToken: refreshToken,
    });

    const { accessToken } = response.data;

    if (!accessToken) {
      localStorage.removeItem("accessToken");
    }

    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    localStorage.removeItem("accessToken");
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
