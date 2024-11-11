const axios = require('axios');
const fs = require('fs');
const path = require('path');

const apiUrl = 'http://localhost:9999/todo';

async function generateSummary() {
  try {
    const response = await axios.get(apiUrl);
    const todos = response.data.todo;

    const completedTodos = todos.filter(todo => todo.completed);
    const pendingTodos = todos.filter(todo => !todo.completed);

    const markdownContent = `
# Project Summary

### Summary:
- **Completed Tasks:** ${completedTodos.length} / ${todos.length} completed.

---

### Section 1: Pending Tasks
${pendingTodos
  .map(todo => `- [ ] ${todo.projectName}: ${todo.projectDescription}`)
  .join('\n')}

---

### Section 2: Completed Tasks
${completedTodos
  .map(todo => `- [x] ${todo.projectName}: ${todo.projectDescription}`)
  .join('\n')}
`;

    const filePath = path.join(__dirname, 'todo-summary.md');
    fs.writeFileSync(filePath, markdownContent);
    console.log('Summary has been saved as todo-summary.md');
  } catch (error) {
    console.error('Error generating the summary:', error);
  }
}

generateSummary();
