import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// Load environment variables
import { config } from 'dotenv';
config({ path: '.env.local' });

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "deepseek/DeepSeek-V3";

export async function testGitHubAI() {
  console.log('🔧 Testing GitHub AI Models integration...');
  
  if (!token) {
    console.error('❌ GITHUB_TOKEN not found in environment variables');
    console.log('Please add your GitHub token to .env.local file:');
    console.log('GITHUB_TOKEN=your_token_here');
    return;
  }

  console.log('✅ GitHub token found (length:', token.length, ')');

  try {
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );

    console.log('🤖 Sending test request to DeepSeek V3...');

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful AI assistant. Respond briefly and professionally." },
          { role: "user", content: "Hello! Can you confirm you're working? Just say 'Yes, I'm working!' and nothing else." }
        ],
        temperature: 0.7,
        max_tokens: 50,
        model: model
      }
    });

    if (isUnexpected(response)) {
      console.error('❌ API Error:', response.body.error);
      return;
    }

    const aiResponse = response.body.choices[0]?.message?.content;
    console.log('✅ AI Response:', aiResponse);
    console.log('🎉 GitHub AI Models integration is working!');
    
  } catch (error) {
    console.error('❌ Error testing GitHub AI:', error.message);
    
    if (error.message.includes('401') || error.message.includes('403')) {
      console.log('💡 This looks like an authentication issue. Please check:');
      console.log('   1. Your GitHub token is valid');
      console.log('   2. You have access to GitHub AI Models');
      console.log('   3. The token has appropriate scopes');
    }
  }
}

// Run the test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testGitHubAI();
} 