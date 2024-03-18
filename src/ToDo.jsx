import React, { useState, useEffect } from 'react';
import './styles.css';

function TodoApp() {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todo-list')) || []);
    const [newTodo, setNewTodo] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        localStorage.setItem('todo-list', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (event) => {
        event.preventDefault();
        if (newTodo.trim().length < 3) {
            setError('La tarea debe tener al menos 3 letras');
        } else if (/[^a-zA-Z0-9 ]/g.test(newTodo)) {
            setError('La tarea no debe contener símbolos');
        } else {
            setTodos([...todos, { name: newTodo.trim(), status: 'pending' }]);
            setNewTodo('');
            setError('');
        }
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const toggleTodo = (index) => {
        const newTodos = todos.map((todo, i) => i === index ? { ...todo, status: todo.status === 'pending' ? 'completed' : 'pending' } : todo);
        setTodos(newTodos);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTodo(event);
        }
    };

    return (
        <div>
            <div className="add-task">
                <h1>Hola! agrega tus tareas del dia porfi.</h1>
                <h2>No aceptamos simbolos.</h2>
                <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyPress={handleKeyPress} />
                <button onClick={addTodo}>Add</button>
                {error && <p>{error}</p>}
            </div>
            {todos.map((todo, index) => (
                <div key={index} className="todo-item">
                    <span style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}>{todo.name}</span>
                    <input type="checkbox" checked={todo.status === 'completed'} onChange={() => toggleTodo(index)} />
                    <button onClick={() => deleteTodo(index)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default TodoApp;