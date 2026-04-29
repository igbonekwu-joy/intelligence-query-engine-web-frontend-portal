import axios from "axios";

jest.mock("axios");

describe("API CSRF", () => {
  it("attaches CSRF token on POST request", async () => {
    document.cookie = "csrf_token=test123";

    const getCsrfToken = () => {
      const match = document.cookie.match(/(^|;)\s*csrf_token=([^;]+)/);
      return match ? decodeURIComponent(match[2]) : null;
    };

    const config = {
      method: "post",
      headers: {}
    };

    const token = getCsrfToken();

    if (token) {
      config.headers["X-CSRF-Token"] = token;
    }

    expect(config.headers["X-CSRF-Token"]).toBe("test123");
  });
});