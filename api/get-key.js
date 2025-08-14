// api/get-key.js
export default function handler(request, response) {
  const mistralApiKey = process.env.MISTRAL_API_KEY;
  const appAccessKey = process.env.APP_ACCESS_KEY;

  const clientAccessKey = request.headers['x-app-access-key'];


  if (!mistralApiKey || !appAccessKey) {
    return response.status(500).json({ error: 'Server configuration error.' });
  }

  if (clientAccessKey !== appAccessKey) {
    return response.status(403).json({ error: 'Forbidden: Invalid access key.' });
  }

  const encodedKey = Buffer.from(mistralApiKey).toString('base64');
  
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-App-Access-Key');

  response.status(200).json({
    key: encodedKey,
  });
}
