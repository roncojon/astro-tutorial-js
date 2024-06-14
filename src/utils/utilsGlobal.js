export const prerender = false;

let number;
let fetchError;
let initialized = false;

async function initialize() {
  try {
    const response = new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomNumber = Math.random();
        resolve(randomNumber);
      }, 2000);
    });

    if (!response) {
      throw new Error('Network response was not ok');
    }
    const data = await response;
    number = data;
  } catch (error) {
    fetchError = error.message;
  } finally {
    initialized = true;
  }
}

let initPromise = initialize();

export function resetInitialization() {
  initialized = false;
  fetchError = null;
  initPromise = initialize(); // Reassign the promise to a new instance
}

export { number, fetchError, initialized, initPromise };
