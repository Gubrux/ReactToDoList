import React, { useState } from 'react';
import './styles.css';
function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');


    const handleAdd = () => {
        if (input.trim().length < 3) {
        setError('La tarea debe tener al menos 3 letras');
        } else if (/[^a-zA-Z0-9 ]/g.test(input)) {
        setError('La tarea no debe contener símbolos');
        } else {
        setTodos([...todos, { text: input, completed: false }]);
    setInput('');
        setError('');
        }
    };

    const handleDelete = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const handleToggle = (index) => {
        setTodos(todos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo));
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        handleAdd();
        }
    };
    return (
        <div>
        <div className="add-task">
        <h1>Hola! agrega tus tareas del dia porfi.</h1>
        <h2>No aceptamos simbolos.</h2>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={handleKeyPress} />
        <button onClick={handleAdd}>Add</button>
        {error && <p>{error}</p>}
        </div>
        {todos.map((todo, i) => (
        <div key={i} className="todo-item">
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(i)} />
            <button onClick={() => handleDelete(i)}>Delete</button>
        </div>
        ))}
    </div>
    );
    }

export default TodoApp;