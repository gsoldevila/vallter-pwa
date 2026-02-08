export default {
  async fetch(request, env, ctx) {
    const targetUrl = "https://vol.vallter.cat/ca/Products/Tickets/checkDate/521/174/5018";

    // Only allow POST requests from your app
    if (request.method === "POST") {
      const body = await request.formData();

      const newRequest = new Request(targetUrl, {
        method: "POST",
        body: body,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Accept": "application/json",
          // The proxy adds the forbidden header here!
          "Referer": "https://vol.vallter.cat/ca/Products/Tickets/Date/521/174/5018",
          "Origin": "https://vol.vallter.cat"
        },
      });

      const response = await fetch(newRequest);

      // Return the response with CORS headers so your PWA can read it
      const corsHeaders = new Headers(response.headers);
      corsHeaders.set("Access-Control-Allow-Origin", "*");

      return new Response(response.body, {
        status: response.status,
        headers: corsHeaders,
      });
    }

    return new Response("Method not allowed", { status: 405 });
  },
};
