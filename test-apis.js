/**
 * API TESTING UTILITY
 * 
 * Use this file to test individual API integrations before running the full pipeline.
 */

require('dotenv').config();
const helpers = require('./api-helpers');
const {
    fetchNews,
    generateScript,
    generateAudio
} = require('./student-implementation');

// ========================================
// INDIVIDUAL API TESTS
// ========================================

async function testNewsAPI() {
    console.log('\n🧪 Testing NewsAPI...\n');
    
    try {
        const articles = await fetchNews();
        
        console.log('✅ NewsAPI Test Passed!');
        console.log(`   Fetched ${articles.length} articles`);
        
        if (articles.length > 0) {
            console.log('\n   Sample article:');
            console.log(`   Title: ${articles[0].title}`);
            console.log(`   Source: ${articles[0].source.name}`);
        }
        
        return true;
    } catch (error) {
        console.error('❌ NewsAPI Test Failed');
        console.error('   Error:', error.message);
        return false;
    }
}

async function testOpenAI() {
    console.log('\n🧪 Testing OpenAI API...\n');
    
    try {
        // Create sample articles for testing
        const sampleArticles = [
            {
                title: 'New AI Model Released',
                description: 'A major tech company released a groundbreaking AI model.',
                source: { name: 'Tech News' }
            },
            {
                title: 'Climate Change Report',
                description: 'Scientists release new findings on climate change.',
                source: { name: 'Science Daily' }
            }
        ];
        
        const script = await generateScript(sampleArticles);
        
        console.log('✅ OpenAI Test Passed!');
        console.log(`   Generated script length: ${script.length} characters`);
        console.log('\n   Script preview:');
        console.log(`   ${script.substring(0, 150)}...`);
        
        return true;
    } catch (error) {
        console.error('❌ OpenAI Test Failed');
        console.error('   Error:', error.message);
        return false;
    }
}

async function testElevenLabs() {
    console.log('\n🧪 Testing ElevenLabs API...\n');
    
    try {
        const testText = 'Hello! This is a test of the ElevenLabs text to speech API. If you can hear this, the integration is working correctly.';
        
        const audioPath = await generateAudio(testText);
        
        console.log('✅ ElevenLabs Test Passed!');
        console.log(`   Audio file saved: ${audioPath}`);
        console.log('   🎧 Play the audio file to verify it works!');
        
        return true;
    } catch (error) {
        console.error('❌ ElevenLabs Test Failed');
        console.error('   Error:', error.message);
        return false;
    }
}

// ========================================
// RUN ALL TESTS
// ========================================

async function runAllTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 API TESTING SUITE');
    console.log('='.repeat(60));
    
    // Validate environment variables first
    const requiredVars = ['NEWSAPI_KEY', 'OPENAI_API_KEY', 'ELEVENLABS_API_KEY'];
    const validation = helpers.validateEnvironmentVariables(requiredVars);
    
    if (!validation.valid) {
        console.error('\n❌ Missing required environment variables:');
        validation.missing.forEach(v => console.error(`   - ${v}`));
        console.error('\n💡 Copy .env.example to .env and add your API keys\n');
        process.exit(1);
    }
    
    const results = {
        newsapi: false,
        openai: false,
        elevenlabs: false
    };
    
    // Test each API
    results.newsapi = await testNewsAPI();
    await delay(1000); // Small delay between tests
    
    results.openai = await testOpenAI();
    await delay(1000);
    
    results.elevenlabs = await testElevenLabs();
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS SUMMARY');
    console.log('='.repeat(60));
    console.log(`NewsAPI:      ${results.newsapi ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`OpenAI:       ${results.openai ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`ElevenLabs:   ${results.elevenlabs ? '✅ PASS' : '❌ FAIL'}`);
    console.log('='.repeat(60) + '\n');
    
    const allPassed = results.newsapi && results.openai && results.elevenlabs;
    
    if (allPassed) {
        console.log('🎉 All APIs are working! You\'re ready to generate podcasts.\n');
    } else {
        console.log('⚠️  Some APIs are not working. Fix the errors above before proceeding.\n');
    }
}

// Helper function to add delay between tests
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ========================================
// COMMAND LINE INTERFACE
// ========================================

const args = process.argv.slice(2);

if (args.length === 0) {
    // No arguments - run all tests
    runAllTests().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
} else {
    // Run specific test based on argument
    const testName = args[0].toLowerCase();
    
    switch (testName) {
        case 'news':
        case 'newsapi':
            testNewsAPI();
            break;
        case 'openai':
        case 'ai':
            testOpenAI();
            break;
        case 'elevenlabs':
        case 'audio':
        case 'tts':
            testElevenLabs();
            break;
        default:
            console.log('Usage: node test-apis.js [news|openai|elevenlabs]');
            console.log('Or run without arguments to test all APIs');
    }
}
