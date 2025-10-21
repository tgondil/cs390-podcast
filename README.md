# 🎙️ AI Podcast Generator

**CS390-WAP: Web Application Programming**  
**Instructor:** Tanay Gondil

---

## 🔗 Quick Links

- **📁 Main Repository:** [https://github.com/tgondil/cs390-podcast](https://github.com/tgondil/cs390-podcast)
- **📄 Handout PDF:** [View handout.pdf](https://github.com/tgondil/cs390-podcast/blob/main/handout.pdf)
- **💻 Student Code:** [student-implementation.js](https://github.com/tgondil/cs390-podcast/blob/main/student-implementation.js)

Clone this repository to get started:
```bash
git clone https://github.com/tgondil/cs390-podcast.git
cd cs390-podcast
npm install
```

---

## 📚 Project Overview

Build an **AI-powered podcast generator** that automatically creates audio podcasts from trending news. This command-line backend application fetches real data from the internet, processes it with AI to generate engaging scripts, and converts those scripts into professional-sounding audio files.

**Difficulty:** Intermediate  
**Cost:** FREE (uses API free tiers)

---

## 🎯 What You'll Build

A Node.js application that:

1. **Fetches** trending news articles from NewsAPI 📰
2. **Generates** an engaging podcast script using OpenAI GPT 🤖
3. **Converts** the script to natural-sounding speech with ElevenLabs 🎤
4. **Saves** a complete podcast as an MP3 file 🎵
5. **Runs** entirely from the command line

**Output:** A professional AI-generated podcast you can actually listen to!

---

## 🎓 Learning Objectives

### Core Concepts from Class

This assignment applies concepts from:
- **Class 1:** Command-line interface (CLI) basics
- **Class 2:** JavaScript fundamentals (variables, functions, arrays, objects)
- **Class 3:** Async/await and API consumption
- **Classes 9-10:** Backend development and API creation

### Technical Skills

- HTTP GET and POST requests
- Multiple authentication methods (API keys, Bearer tokens, custom headers)
- Asynchronous programming with async/await
- Environment variables and API security
- Error handling in backend applications
- File system operations (text and binary files)
- Working with JSON and binary data

---

## 🔑 APIs Used

| API | Purpose | Free Tier | Cost |
|-----|---------|-----------|------|
| **NewsAPI** | Fetch trending news | 100 requests/day | FREE |
| **OpenAI** | Generate podcast script | $5 credit | ~$0.002/podcast |
| **ElevenLabs** | Text-to-speech | 10,000 chars/month | FREE |

**Total Cost: $0** for this assignment!

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Get API Keys (FREE - takes 20 minutes)

**NewsAPI (5 minutes):**
- Visit: https://newsapi.org
- Click "Get API Key" and sign up
- Copy your API key

**OpenAI (10 minutes):**
- Visit: https://platform.openai.com/signup
- Go to: https://platform.openai.com/api-keys
- Create new secret key and copy it
- New accounts get $5 free credit

**ElevenLabs (5 minutes):**
- Visit: https://elevenlabs.io
- Sign up for free account
- Go to profile and copy API key
- Free tier: 10,000 characters/month

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env and add your API keys
```

### 4. Test Your Setup
```bash
npm test
```

### 5. Start Coding!
Open `student-implementation.js` and complete the four functions.

### 6. Run Your Program
```bash
npm start
```

Listen to your AI-generated podcast in the `output/` folder! 🎧

---

## 📁 Project Structure

```
cs390-podcast/
├── README.md                      # This file
├── handout.pdf                    # Complete 10-page assignment guide
│
├── student-implementation.js      # YOUR CODE GOES HERE ⭐
├── api-helpers.js                 # Helper functions (provided)
├── test-apis.js                   # Testing utility (provided)
│
├── .env.example                   # API key template
├── .gitignore                     # Protects secrets and instructor files
├── package.json                   # Dependencies
└── output/                        # Generated files (auto-created)
```

**Students receive only 7 files - everything needed is in `handout.pdf`!**

---

## 📝 Assignment Tasks

### Task 1: Fetch News Articles (25 points)
**Function:** `fetchNews()`

**Concepts:**
- HTTP GET requests
- Query parameters
- API key authentication
- JSON response parsing

**Requirements:**
- Use NewsAPI top-headlines endpoint
- Include required parameters (apiKey, country, category, pageSize)
- Extract and return articles array
- Implement error handling

---

### Task 2: Generate Podcast Script (25 points)
**Function:** `generateScript(articles)`

**Concepts:**
- HTTP POST requests
- Bearer token authentication
- Request body formatting
- Working with AI APIs

**Requirements:**
- Call OpenAI chat completions endpoint
- Use proper Authorization header
- Create messages array with prompt
- Extract generated script
- Save script to file

---

### Task 3: Convert to Audio (25 points)
**Function:** `generateAudio(script)`

**Concepts:**
- Binary data handling
- Custom header authentication
- Audio file formats
- ArrayBuffer responses

**Requirements:**
- Call ElevenLabs text-to-speech endpoint
- Use custom `xi-api-key` header
- Set `responseType: 'arraybuffer'`
- Save audio buffer as MP3
- Return file path

---

### Task 4: Main Orchestration (25 points)
**Function:** `generatePodcast()`

**Concepts:**
- Function composition
- Error handling with try/catch
- Input validation
- User feedback

**Requirements:**
- Validate environment variables
- Call all functions in sequence
- Handle errors gracefully
- Provide clear progress updates
- Return summary object

---

## 🎯 Grading Rubric

| Component | Points | Details |
|-----------|--------|---------|
| **NewsAPI Integration** | 25 | Correct endpoint, parameters, error handling |
| **OpenAI Integration** | 25 | Bearer auth, messages format, response extraction |
| **ElevenLabs Integration** | 25 | Custom headers, binary handling, audio saving |
| **Main Orchestration** | 25 | Validation, error handling, orchestration |
| **Code Quality** | 15 | Error handling, logging, organization, comments |
| **Testing** | 10 | Individual tests pass, full pipeline works |

**Total: 100 points**

---

## 🧪 Testing

```bash
# Test individual APIs
node test-apis.js news
node test-apis.js openai
node test-apis.js elevenlabs

# Test all APIs at once
npm test

# Run the complete program
npm start
```

**Expected Output:**
```
============================================================
AI PODCAST GENERATOR
============================================================
✅ Fetched 5 news articles
✅ Script generated (573 characters)
✅ Audio saved to: output/podcast_2024-10-21.mp3

PODCAST GENERATION COMPLETE!
Listen to your AI-generated podcast!
```

---

## 🔑 Key Backend Concepts

### 1. HTTP Methods
- **GET**: Retrieve data (NewsAPI)
- **POST**: Send data (OpenAI, ElevenLabs)

### 2. Authentication Types
- **Query Parameter**: `?apiKey=YOUR_KEY` (NewsAPI)
- **Bearer Token**: `Authorization: Bearer YOUR_KEY` (OpenAI)
- **Custom Header**: `xi-api-key: YOUR_KEY` (ElevenLabs)

### 3. Async/Await
```javascript
// ❌ Wrong - doesn't wait
const articles = fetchNews();

// ✅ Right - waits for completion
const articles = await fetchNews();
```

### 4. Environment Variables
```javascript
// ❌ Bad - hardcoded secret
const apiKey = 'sk-abc123';

// ✅ Good - from environment
const apiKey = process.env.OPENAI_API_KEY;
```

### 5. Binary Data Handling
```javascript
// For audio/images, use arraybuffer
const response = await axios.post(url, data, {
    headers,
    responseType: 'arraybuffer'  // Important!
});
```

---

## 🔒 Security Warning

⚠️ **DO NOT COMMIT YOUR API KEYS TO VERSION CONTROL**

- Use the `.env` file for your secrets
- Never push `.env` to GitHub
- The `.gitignore` file protects you
- Your API keys are like passwords!

---

## 🐛 Common Issues

### "Missing required environment variables"
- Copy `.env.example` to `.env`
- Add your actual API keys (no quotes needed)

### "401 Unauthorized"
- Double-check your API key
- Verify the authentication method:
  - NewsAPI: query parameter
  - OpenAI: Bearer token
  - ElevenLabs: `xi-api-key` header

### "Cannot read property 'X' of undefined"
- Response structure might be different
- Log the full response: `console.log(response.data)`

### Audio file is corrupted
- Make sure you used `responseType: 'arraybuffer'`
- This is required for binary data (audio/images)

---

## 📤 Submission

### ✅ Include:
- `student-implementation.js` (your completed code)
- `.env.example` (template only - DO NOT submit .env)
- Sample output file from `output/`

### ❌ Don't Include:
- `.env` file (contains your secret keys!)
- `node_modules/` folder (too large)
- Temporary or test files

### Before Submitting:
1. ✅ Run `npm test` - all tests pass
2. ✅ Run `npm start` - program completes successfully
3. ✅ Remove debug console.logs
4. ✅ Add explanatory comments
5. ✅ Verify code is clean and readable

---

## 📚 Resources

### Official API Documentation
- **NewsAPI:** https://newsapi.org/docs
- **OpenAI:** https://platform.openai.com/docs
- **ElevenLabs:** https://elevenlabs.io/docs
- **Axios:** https://axios-http.com/docs/intro
- **Node.js:** https://nodejs.org/docs

### Included Documentation
- **`handout.pdf`** - Complete 10-page assignment guide (print this!)

---

## 🌟 Extension Ideas (Optional)

Once you complete the core assignment:

1. Add different news categories (sports, business, science)
2. Try different ElevenLabs voices
3. Add background music
4. Generate podcasts in different languages
5. Create a scheduling system to run daily
6. Add email delivery of podcasts
7. Build a web interface

---

## 🆘 Getting Help

### When to Ask for Help
- After trying to debug for 30+ minutes
- When you've checked all resources
- When you're not sure what an error means

### How to Ask for Help
Provide:
1. What you're trying to do
2. What you expected to happen
3. What actually happened (error message)
4. What you've already tried

### Debugging Checklist
1. Read the error message carefully
2. Check which step is failing (use `node test-apis.js`)
3. Verify API keys are correct in `.env`
4. Use `console.log()` to inspect data
5. Review the relevant section in `handout.pdf`
6. Check the official API documentation

---

## 📊 Project Stats

- **Total Lines of Code:** ~150-200 lines
- **APIs Used:** 3
- **Files to Edit:** 1 (`student-implementation.js`)
- **Functions to Implement:** 4
- **Dependencies:** 2 (axios, dotenv)
- **Output:** MP3 podcast file + text script

---

## 🎯 Assignment Alignment

This project reinforces learning from:

| Class | Topic | Applied In |
|-------|-------|------------|
| Class 1 | CLI basics | Running commands, npm scripts |
| Class 2 | JavaScript fundamentals | Variables, functions, arrays |
| Class 3 | Async/await & APIs | All API calls, promises |
| Classes 9-10 | Backend/API creation | HTTP methods, authentication |

---

## 📖 Documentation Quality

The included `handout.pdf` provides:

- ✅ Complete setup instructions with screenshots
- ✅ Step-by-step implementation guidance
- ✅ Code examples and syntax references
- ✅ Common errors and solutions
- ✅ Grading rubric and requirements
- ✅ Best practices and tips
- ✅ Testing and debugging strategies

**Everything students need is in one comprehensive PDF!**

---

## 🎉 Good Luck!

**Start Building:** [https://github.com/tgondil/cs390-podcast](https://github.com/tgondil/cs390-podcast)
