import React, { useEffect, useState } from 'react';
import '../css/home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  emoji: string;
  timestamp: number;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [
      { id: 1, text: 'List out your tasks below', completed: false, emoji: '😊', timestamp: Date.now() },
      { id: 2, text: 'Tasks will be deleted after 24 hours', completed: false, emoji: '😊', timestamp: Date.now() }
    ];
  });

  const [newTask, setNewTask] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const addTask = () => {
    if (newTask.trim() === '') {
      alert('Please enter a task.');
      return;
    }

    const newTaskItem: Task = {
      id: tasks.length + 1,
      text: newTask,
      completed: false,
      emoji: '😊',
      timestamp: Date.now()
    };

    const updatedTasks = [...tasks, newTaskItem];
    setTasks(updatedTasks);
    setNewTask('');
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const checkTaskExpiration = () => {
    const currentTime = Date.now();
    const updatedTasks = tasks.filter(task => currentTime - task.timestamp <= 24 * 60 * 60 * 1000); // 24 hours in ms
    if (updatedTasks.length !== tasks.length) {
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  useEffect(() => {
    checkTaskExpiration();
    const interval = setInterval(checkTaskExpiration, 60 * 60 * 1000); 
    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <>
      <article className="TopArticle">
        <div className="head">
          <div className="calender">
            <h3 className="days">
              <span>
                <FontAwesomeIcon icon={faCalendarDays} className="fa" />
                {currentDate}
              </span>
            </h3>
          </div>
          <div className="profile">
            <img src="https://via.placeholder.com/150" alt="profile" />
            <h3>User Name</h3>
          </div>
        </div>
        <div className="hrDiv">
          <hr className='hr' />
        </div>
        <div className="greetings">
          <h2><span>Good Morning</span>, <span className='name'>Elizabeth</span></h2>
        </div>
      </article>

      <article className="BottomArticle">
        <div className="gridContainer">
          <div className="grid-item item1">
            <div className="todo-list">
              <h3 className='titleHeadings'>To do list</h3>
              <div className="add-task">
                <input
                  type="text"
                  placeholder="Add a new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask}>Add</button>
              </div>
              <ul>
                {tasks.map(task => (
                  <li key={task.id}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.text}
                    </span>
                    <button onClick={() => setShowEmojiPicker(showEmojiPicker === task.id ? null : task.id)}>
                      {task.emoji}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid-item item5">
            <div className="taskLst">
              <h2>My Tasks</h2>
            </div>
            <div className="tsList">
              <div className="divHeading">
                <div className="div1">TEAM</div>
                <div className="div2">TASK</div>
                <div className="div3">DUE DATE</div>
              </div>
              <hr />
              <div className="divHeading">
                <div className="div1">Team1</div>
                <div className="div2">Task1</div>
                <div className="div3">Due Date</div>
              </div>
              <div className="divHeading">
                <div className="div1">Team2</div>
                <div className="div2">Task2</div>
                <div className="div3">Due Date</div>
              </div>
              <div className="divHeading">
                <div className="div1">Team3</div>
                <div className="div2">Task3</div>
                <div className="div3">Due Date</div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Home;
