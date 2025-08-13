// api/get-key.js
export default function handler(request, response) {
  const mistralApiKey = process.env.MISTRAL_API_KEY;

  const accessKey = process.env.APP_ACCESS_KEY;
  
  const providedKey = request.headers['x-access-key'];

  if (!accessKey || providedKey !== accessKey) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  if (!mistralApiKey) {
    return response.status(500).json({ error: 'Server configuration error' });
  }

  const encodedKey = Buffer.from(mistralApiKey).toString('base64');
  
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Key');

  response.status(200).json({
    key: encodedKey,
  });
}
