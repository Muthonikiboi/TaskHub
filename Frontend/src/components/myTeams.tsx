import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/teams.css';

interface Team {
  id: string;
  name: string;
  description: string;
  members: string[];
  tasks: Task[];
}

interface Task {
  id: number;
  title: string;
  assignee: string;
  stage: string;
  date: string;
  priority: string;
}

interface Comment {
  content: string;
  user_id: {
    xata_id: string;
  };
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [showMemberModal, setShowMemberModal] = useState<boolean>(false);
  const [newMemberEmail, setNewMemberEmail] = useState<string>('');

  // Task form state
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskAssignee, setTaskAssignee] = useState<string>('');
  const [taskStage, setTaskStage] = useState<string>('TODO');
  const [taskDate, setTaskDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [taskPriority, setTaskPriority] = useState<string>('NORMAL');

  // Fetch teams from API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/v1/teams');
        const apiTeams = response.data.data.map((team: any) => ({
          id: team.xata_id,
          name: team.teamname,
          description: team.description,
          members: [],  // Assuming no members in the current API response
          tasks: [],    // Placeholder for tasks
        }));
        setTeams(apiTeams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  // Fetch comments for the selected team
  const fetchComments = async (teamId: string) => {
    try {
      const response = await axios.get(`http://localhost:7000/api/v1/comments?team_id=${teamId}`);
      setComments(response.data.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Handle comments click
  const handleCommentsClick = (teamId: string) => {
    setSelectedTeamId(teamId);
    fetchComments(teamId);
  };

  // Add a new comment
  const addComment = async () => {
    if (!newComment.trim() || !selectedTeamId) return;

    const newCommentData = {
      content: newComment,
      user_id: { xata_id: 'your_user_id' }, // Replace with actual user ID
      task_id: { xata_id: 'your_task_id' } // Optional, you can remove if not needed
    };

    try {
      await axios.post(`http://localhost:7000/api/v1/comments`, newCommentData);
      setComments([...comments, newCommentData]); // Update state with new comment
      setNewComment(''); // Clear input
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Add a new task
  const addTask = () => {
    if (!taskTitle.trim() || !taskAssignee.trim()) return;

    const newTask: Task = {
      id: teams.find((team) => team.id === selectedTeamId)?.tasks.length! + 1,
      title: taskTitle,
      assignee: taskAssignee,
      stage: taskStage,
      date: taskDate,
      priority: taskPriority,
    };

    setTeams(
      teams.map((team) =>
        team.id === selectedTeamId
          ? { ...team, tasks: [...team.tasks, newTask] }
          : team
      )
    );

    // Reset task form
    setTaskTitle('');
    setTaskAssignee('');
    setTaskStage('TODO');
    setTaskDate(new Date().toISOString().slice(0, 10));
    setTaskPriority('NORMAL');
    setShowTaskModal(false);
  };

  return (
    <>
      <article className="TopArticle">
        <div className="title">
          <h1>My Teams</h1>
        </div>
      </article>
      <article className="BottomArticle">
        <div className="teamLists">
          {teams.map((team) => (
            <div className="grid-item" key={team.id}>
              <h2>{team.name}</h2>
              <p>{team.description}</p>

              <h5 className="comms" onClick={() => handleCommentsClick(team.id)}>
                Comments
              </h5>

              <div className="members">
                <h4>Members:</h4>
                <ul>
                  {team.members.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              </div>

              <div className="btns">
                <button onClick={() => { setSelectedTeamId(team.id); setShowMemberModal(true); }}>
                  Add Member
                </button>
                <button onClick={() => { setSelectedTeamId(team.id); setShowTaskModal(true); }}>
                  Add Task
                </button>
              </div>
              {/* Task Management */}
              {team.tasks.length > 0 && (
                <div className="tasks">
                  <h4>Tasks:</h4>
                  <ul>
                    {team.tasks.map((task) => (
                      <li key={task.id}>
                        {task.title} - {task.assignee} ({task.stage}) [Due: {task.date}, Priority: {task.priority}]
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comments Section */}
        <div className="comments">
          <h2>{teams.find((team) => team.id === selectedTeamId)?.name || 'Select a Team'}</h2>
          <div className='commentsDiv'>
            {comments.map((comment, index) => (
              <div key={index} className='comment1'>
                <h6>User: {comment.user_id.xata_id}</h6>
                <hr />
                <p>{comment.content}</p>
              </div>
            ))}
          </div>

          {/* Comment input box */}
          <div className='commenting'>
            <input 
              type="text" 
              placeholder="Write a comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className='button' onClick={addComment}>Send</button>
          </div>
        </div>

        {/* Task Modal */}
        {showTaskModal && (
          <div className="task-modal">
            <div className="modal-content">
              <h3>Add New Task</h3>
              <input 
                type="text" 
                placeholder="Task Title" 
                value={taskTitle} 
                onChange={(e) => setTaskTitle(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Assignee" 
                value={taskAssignee} 
                onChange={(e) => setTaskAssignee(e.target.value)} 
              />
              <select value={taskStage} onChange={(e) => setTaskStage(e.target.value)}>
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
              <input 
                type="date" 
                value={taskDate} 
                onChange={(e) => setTaskDate(e.target.value)} 
              />
              <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
                <option value="LOW">Low</option>
                <option value="NORMAL">Normal</option>
                <option value="HIGH">High</option>
              </select>
              <button className="button" onClick={addTask}>Add Task</button>
              <button className="button" onClick={() => setShowTaskModal(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Member Modal */}
        {showMemberModal && selectedTeamId !== null && (
          <div className="member-modal">
            <div className="modal-content">
              <h3>Add Member</h3>
              <label htmlFor="">Enter Email</label>
              <input
                type="email"
                placeholder="Member Email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
              <button onClick={() => addMember(selectedTeamId)} className='button'>Submit</button>
              <button onClick={() => setShowMemberModal(false)} className='button'>Cancel</button>
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default Teams;
