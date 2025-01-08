const fs = require('fs');
const filePath = 'todos.txt';
const ensureFileExists = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8');
    }
};
const readTodos = () => {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n').filter(line => line.trim().length > 0);
};
const writeTodos = (todos) => {
    fs.writeFileSync(filePath, todos.join('\n'), 'utf8');
};
const addTodo = (task) => {
    const todos = readTodos();
    todos.push(task);
    writeTodos(todos);
    console.log('Todo added!');
};
const listTodos = () => {
    const todos = readTodos();
    if (todos.length === 0) {
        console.log('No todos found!');
        return;
    }
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
    });
};
const deleteTodo = (index) => {
    const todos = readTodos();
    if (index < 1 || index > todos.length) {
        console.log('Invalid todo number!');
        return;
    }
    todos.splice(index - 1, 1);
    writeTodos(todos);
    console.log('Todo deleted!');
};
const handleCommand = () => {
    ensureFileExists();
        const command = process.argv[2];
    const argument = process.argv[3];
    switch (command) {
        case 'add':
            if (!argument) {
                console.log('Please provide a task to add!');
            } else {
                addTodo(argument);
            }
            break;
        case 'list':
            listTodos();
            break;
        case 'delete':
            const todoIndex = parseInt(argument);
            if (isNaN(todoIndex)) {
                console.log('Please provide a valid todo number to delete!');
            } else {
                deleteTodo(todoIndex);
            }
            break;
        case undefined:
        case '':
            console.log('Usage:');
            console.log('  node todo.js add <task>      # Add a new task');
            console.log('  node todo.js list            # Display all tasks');
            console.log('  node todo.js delete <number> # Delete a task by its number');
            break;
        default:
            console.log('Unknown command!');
            break;
    }
};
handleCommand();