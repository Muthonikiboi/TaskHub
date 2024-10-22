import React, { useEffect, useState } from 'react';
import '../css/myTasks.css';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:7000/api/v1/tasks');
                const data = await response.json();

                if (response.ok) {
                    setTasks(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost:7000/api/v1/teams');
                const data = await response.json();

                if (response.ok) {
                    setTeams(data.data); 
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchTasks(), fetchTeams()]);
            setLoading(false);
        };

        fetchData();
    }, []);


    const teamMap = teams.reduce((acc, team) => {
        acc[team.xata_id] = team.name; 
        return acc;
    }, {});


    const inProgressTasks = tasks.filter(task => task.status === 'In progress');
    const pendingTasks = tasks.filter(task => task.status === 'Pending');
    const completedTasks = tasks.filter(task => task.status === 'Completed');

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <>
          <article className="TopArticle">
            <div className="title">
                <h1>My Tasks</h1>
            </div>
          </article>
          <article className="BottomArticle">
            <div className="tasksDiv">
              <div className='gridItem item2'>
                <h2>Pending</h2>
                <div className='taskSect'>
                  {pendingTasks.map(task => (
                    <div key={task.xata_id} className="taskDetails">
                      <h3>Team: <p>{teamMap[task.assignedTo.xata_id] || 'Unknown'}</p></h3>
                      <h3>Task: <p>{task.description}</p></h3>
                      <h3>Due: <p>{new Date(task.due_date).toLocaleDateString()}</p></h3>
                    </div>
                  ))}
                </div>
              </div>
              <div className='gridItem item1'>
                <h2>In progress</h2>
                <div className='taskSect'>
                  {inProgressTasks.map(task => (
                    <div key={task.xata_id} className="taskDetails">
                      <h3>Team: <p>{teamMap[task.assignedTo.xata_id] || 'Unknown'}</p></h3>
                      <h3>Task: <p>{task.description}</p></h3>
                      <h3>Due: <p>{new Date(task.due_date).toLocaleDateString()}</p></h3>
                    </div>
                  ))}
                </div>
              </div>

              <div className='gridItem item3'>
                <h2>Completed</h2>
                <div className='taskSect'>
                  {completedTasks.map(task => (
                    <div key={task.xata_id} className="taskDetails">
                      <h3>Team: <p>{teamMap[task.assignedTo.xata_id] || 'Unknown'}</p></h3>
                      <h3>Task: <p>{task.description}</p></h3>
                      <h3>Due: <p>{new Date(task.due_date).toLocaleDateString()}</p></h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </>
    );
}

export default Tasks;
