# review

Please conduct a comprehensive codebase audit with the following objectives:

## Analysis Requirements

1. **Performance Issues**
   - Identify unnecessary re-renders, redundant API calls, and inefficient algorithms
   - Find opportunities for code splitting, lazy loading, and memoization
   - Detect memory leaks and resource-intensive operations
   - Flag N+1 queries or inefficient database operations

2. **Best Practices & Code Quality**
   - Check for security vulnerabilities (XSS, CSRF, injection attacks)
   - Verify proper error handling and validation
   - Assess code organization, naming conventions, and architectural patterns
   - Review accessibility compliance and SEO optimization
   - Identify hard-coded values that should be environment variables

3. **Server Actions & Code Reusability**
   - Find client-side functions that should be server actions
   - Identify duplicated logic that can be extracted into reusable utilities
   - Flag functions called multiple times that could be consolidated
   - Suggest where to implement caching strategies

4. **Bug Detection**
   - Look for logic errors, race conditions, and edge cases
   - Check for improper state management
   - Identify potential null/undefined errors
   - Find broken dependencies or deprecated package usage

## Deliverable Format

Create a detailed markdown file (`codebase-audit-YYYY-MM-DD.md`) structured as follows:

### For Each Issue Found:

1. **Issue Title** (clear, descriptive)
2. **Severity**: Critical / High / Medium / Low
3. **Category**: Performance / Best Practice / Security / Bug / Refactoring
4. **Current Code**: Exact file path and code snippet
5. **Problem Explanation**: Why this is an issue
6. **Solution**: Step-by-step implementation instructions including:
   - Exact file location (full path)
   - Specific lines to modify/add/remove
   - Complete code to add (not just snippets)
   - Any new files to create with full paths
   - Required package installations or configuration changes
7. **Expected Impact**: What improvement this will provide

### Prioritization:

- List issues in order of: Critical bugs → Security → Performance → Best practices
- Include an executive summary at the top with total issues found by category

## Instructions for Analysis

- Read through ALL files in the project systematically
- Cross-reference related files to understand data flow
- Don't skip configuration files, package.json, or environment setups
- Check for consistency across similar components/functions
- Consider the project's specific framework and tech stack

Before starting, please:

1. Confirm you've identified the tech stack and framework
2. List the total number of files you'll be analyzing
3. Ask if there are any specific areas of concern to prioritize
