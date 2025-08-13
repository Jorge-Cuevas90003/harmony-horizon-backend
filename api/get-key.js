// api/get-key.js
export default function handler(request, response) {
  const mistralApiKey = process.env.MISTRAL_API_KEY;

  if (!mistralApiKey) {
    return response.status(500).json({ error: 'Server configuration error: API key not found.' });
  }

  const encodedKey = Buffer.from(mistralApiKey).toString('base64');
  
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  response.status(200).json({
    key: encodedKey,
  });
}