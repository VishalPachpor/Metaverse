const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
});

async function POST(request) {
  const { email } = await request.json();

  if (!email)
    return new Response(JSON.stringify({ error: "Email is required" }));

  try {
    const res = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      { email_address: email, status: "subscribed" }
    );

    return new Response(JSON.stringify({ res }));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: JSON.parse(error.response.text) })
    );
  }
}

module.exports = { POST };
