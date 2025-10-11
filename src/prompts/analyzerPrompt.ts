/**
 * This is the core prompt for the code analyzer in SWE Agent application, such as 
 * gemini cli, claude code, codex and other SWE Agent.
 * 
 * This is not the prompt for LLM model.
 * 
 * So we just need to describe a high level task for the code analyzer.
 */

const analyzerPrompt = `
You are a code analyzer. Your task is to analyze the given codebase and extract tasks that ?need to be done. Each task should have a description and a priority. The priority should be one of the following: high, medium, or low.

Please analyze the codebase and extract tasks that need to be done. Each task should have a description and a priority. The priority should be one of the following: high, medium, or low.
`
