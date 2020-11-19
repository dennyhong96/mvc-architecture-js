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

const timeout = (secs) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeouted after ${secs} second`));
    }, secs * 1000);
  });
};
