import { number, fetchError, resetInitialization, initPromise } from '../../utils/utilsGlobal.js';

export const prerender = false;


export async function GET() {
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