import { REQUEST_TIMEOUT_SECS } from "./config";

// Helper functions
export const getJSON = async (url) => {
  try {
    // Timeout request after 5 seconds.
    const res = await Promise.race([fetch(url), timeout(REQUEST_TIMEOUT_SECS)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} - ${res.status}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async (url, body) => {
  try {
    // Timeout request after 5 seconds.
    const res = await Promise.race([
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
      timeout(REQUEST_TIMEOUT_SECS),
    ]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} - ${res.status}`);

    return data;
  } catch (error) {
    throw error;
  }
};

// returns a promise that rejects after certain seconds
const timeout = (secs) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeouted after ${secs} second`));
    }, secs * 1000);
  });
};
