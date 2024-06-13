let number;
let fetchError;
let initialized = false;

export async function initialize() {
    try {
        // const response = await fetch('https://api.example.com/random-number');
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
    initPromise = initialize();
}

export { number, fetchError, initialized, initPromise };
