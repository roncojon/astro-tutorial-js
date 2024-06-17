import { number, fetchError, initialized, resetInitialization, initPromise } from '../../utils/utilsGlobalFetchTest';

export const prerender = false;

console.log('numbernumber', number);

export async function GET() {
  // Ensure the initialization has completed
  if (!initialized) {
    await initPromise; // Await the promise to ensure initialization is complete
  }

  if (fetchError) {
    return new Response(
      JSON.stringify({ error: fetchError }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }

  return new Response(
    JSON.stringify({ number, message: `Here's a random number: ${number}` }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

// http://localhost:4321/api/hello 
export async function POST() {
  // Trigger re-initialization
  resetInitialization();

  // Wait for the initialization to complete
  await initPromise;

  if (fetchError) {
    return new Response(
      JSON.stringify({ error: fetchError }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }

  return new Response(
    JSON.stringify({ message: 'Initialization triggered successfully.', number }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
