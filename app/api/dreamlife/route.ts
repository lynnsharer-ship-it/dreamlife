export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await fetch(`${process.env.OPENCLAW_BASE_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENCLAW_TOKEN}`,
    },
    body: JSON.stringify({
      model: "openclaw/default",
      user: "dreamlife",
      messages: [
        {
          role: "system",
          content: "You are Dreamlife. Use the Dreamlife skill and return only the final output."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();

  return Response.json({
    text: data?.choices?.[0]?.message?.content || "No response"
  });
}
