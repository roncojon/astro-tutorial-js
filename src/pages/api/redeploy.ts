// import { allowedOrigins, checkOrigin } from "@/utils/originUtils";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET:APIRoute=async ({request})=> {
  console.log('startingRedeploy0request',request)
  // if (!checkOrigin(request, allowedOrigins)) {
  //   console.log('ForbiddenRedeploy');
  //   return new Response(JSON.stringify({ error: 'Forbidden' }), {
  //     status: 403,
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // }

  try {
    console.log('startingRedeploy1')
    const response = await fetch('https://api.vercel.com/v1/integrations/deploy/prj_SR3scROY9yBxcgojAqe5oPi4Av8H/j7KHJ5fTHX'); // Replace with your target endpoint URL
    console.log('redeployResponse', response);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return new Response(
      JSON.stringify(data), // Correctly stringify the data
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.log('redeployError', error);
    return new Response(
      JSON.stringify({ error: error ?? '' }), // Correctly stringify the error message
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
}
