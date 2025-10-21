/**
 * API HELPERS - PROVIDED CODE
 * 
 * This file contains helper functions and utilities for the podcast generator.
 * DO NOT MODIFY THIS FILE - Use these functions in your student-implementation.js
 */

const fs = require('fs');
const path = require('path');

// ========================================
// FILE SYSTEM HELPERS
// ========================================

/**
 * Save audio data to a file
 * @param {Buffer} audioData - The audio data buffer
 * @param {string} filename - The filename to save (e.g., 'podcast.mp3')
 * @returns {string} - The full path to the saved file
 */
function saveAudioFile(audioData, filename) {
    const outputDir = path.join(__dirname, 'output');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const filePath = path.join(outputDir, filename);
    fs.writeFileSync(filePath, audioData);
    
    console.log(`✅ Audio saved to: ${filePath}`);
    return filePath;
}

/**
 * Save text data to a file
 * @param {string} text - The text content to save
 * @param {string} filename - The filename to save (e.g., 'script.txt')
 * @returns {string} - The full path to the saved file
 */
function saveTextFile(text, filename) {
    const outputDir = path.join(__dirname, 'output');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const filePath = path.join(outputDir, filename);
    fs.writeFileSync(filePath, text, 'utf-8');
    
    console.log(`✅ Text saved to: ${filePath}`);
    return filePath;
}

/**
 * Read a file as a buffer (useful for uploading audio)
 * @param {string} filePath - Path to the file
 * @returns {Buffer} - File contents as buffer
 */
function readFileAsBuffer(filePath) {
    return fs.readFileSync(filePath);
}

// ========================================
// TEXT PROCESSING HELPERS
// ========================================

/**
 * Format articles into a readable text format
 * @param {Array} articles - Array of article objects
 * @returns {string} - Formatted text
 */
function formatArticlesForSummary(articles) {
    if (!articles || articles.length === 0) {
        return 'No articles available.';
    }
    
    let formatted = 'Today\'s Top News Articles:\n\n';
    
    articles.forEach((article, index) => {
        formatted += `${index + 1}. ${article.title}\n`;
        if (article.description) {
            formatted += `   ${article.description}\n`;
        }
        formatted += `   Source: ${article.source?.name || 'Unknown'}\n\n`;
    });
    
    return formatted;
}

/**
 * Create a podcast script prompt for the LLM
 * @param {string} newsContent - The formatted news content
 * @returns {string} - The prompt for the LLM
 */
function createPodcastPrompt(newsContent) {
    return `You are a professional podcast host creating a daily tech news podcast.

Your task is to take the following news articles and create an engaging, conversational podcast script (2-3 minutes when spoken).

Requirements:
- Start with an energetic greeting
- Summarize the top 3-4 most interesting stories
- Use a conversational, friendly tone
- Keep it concise (300-400 words)
- Make it sound natural when spoken aloud
- End with a friendly sign-off

News Articles:
${newsContent}

Create the podcast script now:`;
}

/**
 * Generate a timestamp-based filename
 * @param {string} prefix - Prefix for the filename (e.g., 'podcast')
 * @param {string} extension - File extension (e.g., 'mp3')
 * @returns {string} - Filename with timestamp
 */
function generateTimestampedFilename(prefix, extension) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    return `${prefix}_${timestamp}.${extension}`;
}

// ========================================
// VALIDATION HELPERS
// ========================================

/**
 * Check if all required environment variables are set
 * @param {Array<string>} requiredVars - Array of required variable names
 * @returns {Object} - {valid: boolean, missing: Array<string>}
 */
function validateEnvironmentVariables(requiredVars) {
    const missing = [];
    
    for (const varName of requiredVars) {
        if (!process.env[varName] || process.env[varName].includes('your_')) {
            missing.push(varName);
        }
    }
    
    return {
        valid: missing.length === 0,
        missing: missing
    };
}

/**
 * Check if an API response is valid
 * @param {Object} response - Axios response object
 * @param {number} expectedStatus - Expected status code (default: 200)
 * @returns {boolean} - Whether the response is valid
 */
function isValidApiResponse(response, expectedStatus = 200) {
    return response && response.status === expectedStatus && response.data;
}

// ========================================
// ERROR HANDLING HELPERS
// ========================================

/**
 * Handle API errors with helpful messages
 * @param {Error} error - The error object
 * @param {string} apiName - Name of the API that failed
 */
function handleApiError(error, apiName) {
    console.error(`\n❌ ${apiName} API Error:`);
    
    if (error.response) {
        // The request was made and the server responded with a status code
        console.error(`Status: ${error.response.status}`);
        console.error(`Message: ${error.response.data?.error?.message || error.response.statusText}`);
        
        if (error.response.status === 401) {
            console.error(`💡 Tip: Check that your ${apiName} API key is correct`);
        } else if (error.response.status === 429) {
            console.error(`💡 Tip: You've hit the rate limit. Wait a bit and try again.`);
        } else if (error.response.status === 403) {
            console.error(`💡 Tip: Access forbidden. Check your API permissions.`);
        }
    } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from server');
        console.error('💡 Tip: Check your internet connection');
    } else {
        // Something happened in setting up the request
        console.error('Error:', error.message);
    }
}

/**
 * Retry an async function with exponential backoff
 * @param {Function} fn - The async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in milliseconds
 * @returns {Promise<any>} - Result of the function
 */
async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            
            console.log(`⚠️  Attempt ${i + 1} failed. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2; // Exponential backoff
        }
    }
}

// ========================================
// LOGGING HELPERS
// ========================================

/**
 * Log a step in the process with formatting
 * @param {number} stepNumber - The step number
 * @param {string} description - Description of the step
 */
function logStep(stepNumber, description) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📍 STEP ${stepNumber}: ${description}`);
    console.log('='.repeat(60));
}

/**
 * Log success message
 * @param {string} message - Success message
 */
function logSuccess(message) {
    console.log(`✅ ${message}`);
}

/**
 * Log info message
 * @param {string} message - Info message
 */
function logInfo(message) {
    console.log(`ℹ️  ${message}`);
}

/**
 * Log warning message
 * @param {string} message - Warning message
 */
function logWarning(message) {
    console.log(`⚠️  ${message}`);
}

// ========================================
// EXPORTS
// ========================================

module.exports = {
    // File system
    saveAudioFile,
    saveTextFile,
    readFileAsBuffer,
    
    // Text processing
    formatArticlesForSummary,
    createPodcastPrompt,
    generateTimestampedFilename,
    
    // Validation
    validateEnvironmentVariables,
    isValidApiResponse,
    
    // Error handling
    handleApiError,
    retryWithBackoff,
    
    // Logging
    logStep,
    logSuccess,
    logInfo,
    logWarning
};

