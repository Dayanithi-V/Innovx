const axios = require('axios');

exports.analyzeRepo = async (repoName) => {
  const prompt = `You are an expert DevOps engineer. Analyze the "${repoName}" repository and provide:
1. Tech stack used
2. Necessary dependencies
3. Start command
4. Frameworks, languages, DB used
5. Ports and env vars`;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].message.content;
};
