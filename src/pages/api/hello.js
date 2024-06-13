import { number, fetchError, initialized, resetInitialization, initPromise } from '../../utils/utilsGlobal.js';
// export const prerender = true;

console.log('numbernumber', number);

export async function GET() {
  // Ensure the initialization has completed
  if (!initialized) {
    await initPromise;
  }

  if (fetchError) {
    return new Response(
      JSON.stringify({
        error: fetchError,
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 500
      }
    );
  }

  return new Response(
    JSON.stringify({
      number,
      message: `Here's a random number: ${number}`,
    }),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}


export async function POST() {
  // Trigger re-initialization
  resetInitialization();

  await initPromise;

  if (fetchError) {
    return new Response(
      JSON.stringify({
        error: fetchError,
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 500
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: 'Initialization triggered successfully.',
      number,
    }),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
