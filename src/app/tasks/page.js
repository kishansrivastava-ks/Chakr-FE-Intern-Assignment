"use client";
import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
// import fs from "fs";
// import path from "path";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
`;

const TaskList = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  /* background-color:   red; */
  margin-bottom: auto;
  margin-right: auto;
  margin-left: 1rem;
  padding: 10px;
`;

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border: 1px solid ${({ theme }) => theme.color};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.background};
  /* background-color: lightgray; */
  & > div > h3 {
    font-size: 2rem;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color};
  cursor: pointer;
  margin-left: 10px;
  background-color: red;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  color: #fff;
  &:nth-child(1) {
    background-color: gray;
  }
  &:nth-child(2) {
    background-color: green;
  }
`;

const NoTasksContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.color};
  padding: 2rem 5rem;
  border-radius: 5px;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  padding: 20px;
  border-radius: 5px;
  /* height: 100%; */
  /* background-color: red; */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color};
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  /* border: 1px solid ${({ theme }) => theme.color}; */
  border-radius: 5px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

const theme = {
  color: "#fff",
  background: "#333",
};

const CreateTaskButton = styled.button`
  background-color: green;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  /* margin-right: auto; */
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 2rem;
`;
// const tasksFilePath = path.resolve(__dirname, "../data/tasks.json");

// Modal.setAppElement("#root");

const Header = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const AddTaskButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.color};
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTask({ title: "", description: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleCreateTask = () => {
    const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
    setTasks(updatedTasks);
    handleCloseModal();
  };

  const handleEditTask = (taskId) => {
    // Implement edit task logic
  };

  const handleCompleteTask = (taskId) => {
    // Implement mark as complete logic
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <Container>
      <Header>
        <AddTaskButton onClick={handleAddTask}>
          <FaPlusCircle />
          Add Task
        </AddTaskButton>
      </Header>
      {tasks.length === 0 ? (
        <NoTasksContainer onClick={handleAddTask}>
          <span style={{ display: "flex", gap: "1rem" }}>
            <FaPlusCircle size={25} />
            <p>No tasks added yet</p>
          </span>
          <button>Click to add first task</button>
        </NoTasksContainer>
      ) : (
        <TaskList>
          {tasks.map((task) => (
            <TaskItem key={task.id}>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <div>
                <ActionButton onClick={() => handleEditTask(task.id)}>
                  Edit
                </ActionButton>
                <ActionButton onClick={() => handleCompleteTask(task.id)}>
                  Mark as Complete
                </ActionButton>
                <ActionButton onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </ActionButton>
              </div>
            </TaskItem>
          ))}
        </TaskList>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            // backgroundColor: "${({ theme }) => theme.background}",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <CloseButton onClick={handleCloseModal}>
          <FaTimes />
        </CloseButton>
        <ModalContent>
          {/* <h2>Create Task</h2> */}
          <Input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            placeholder="Task Title"
          />
          <Input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleChange}
            placeholder="Task Description"
          />
          <CreateTaskButton onClick={handleCreateTask}>
            Create Task
          </CreateTaskButton>
        </ModalContent>
      </Modal>
    </Container>
  );
}

// pages/tasks.js
// import { useEffect } from "react";
// import styled, { ThemeProvider } from "styled-components";
// import { FaPlusCircle, FaTimes } from "react-icons/fa";
// import Modal from "react-modal";
// import axios from "axios";

// const Button = styled.button`
//   padding: 0.5rem 1rem;
//   background: ${({ theme }) => theme.color};
//   color: ${({ theme }) => theme.background};
//   border: none;
//   border-radius: 5px;
// `;

// const Tasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newTask, setNewTask] = useState("");

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get("/api/tasks");
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Failed to fetch tasks:", error);
//     }
//   };

//   const handleAddTask = async () => {
//     const task = { id: Date.now(), name: newTask };
//     try {
//       await axios.post("/api/tasks", task);
//       setTasks((prevTasks) => [...prevTasks, task]);
//       setNewTask("");
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Failed to add task:", error);
//     }
//   };

//   const handleDeleteTask = async (id) => {
//     try {
//       await axios.delete("/api/tasks", { data: { id } });
//       setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
//     } catch (error) {
//       console.error("Failed to delete task:", error);
//     }
//   };

//   return (
//     <Container>
//       {tasks.length === 0 ? (
//         <div>
//           <FaPlusCircle size={50} />
//           <div>No tasks added yet</div>
//           <div onClick={() => setIsModalOpen(true)}>
//             click to add first task
//           </div>
//         </div>
//       ) : (
//         <TaskList>
//           {tasks.map((task) => (
//             <TaskItem key={task.id}>
//               {task.name}
//               <div>
//                 <span onClick={() => handleDeleteTask(task.id)}>Delete</span>
//               </div>
//             </TaskItem>
//           ))}
//           <AddTaskButton onClick={() => setIsModalOpen(true)}>
//             <FaPlusCircle size={20} /> Add Task
//           </AddTaskButton>
//         </TaskList>
//       )}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)}
//         contentLabel="Add Task"
//       >
//         <ModalContent>
//           <FaTimes onClick={() => setIsModalOpen(false)} />
//           <h2>Add Task</h2>
//           <Input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Task name"
//           />
//           <Button onClick={handleAddTask}>Create Task</Button>
//         </ModalContent>
//       </Modal>
//     </Container>
//   );
// };

// export default Tasks;
