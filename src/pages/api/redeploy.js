export async function GET() {
    try {
      const response = await fetch('https://api.vercel.com/v1/integrations/deploy/prj_SR3scROY9yBxcgojAqe5oPi4Av8H/oPosmDNgpn'); // Replace with your target endpoint URL
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return new Response(
        JSON.stringify('redeployData',data),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }
  }
  