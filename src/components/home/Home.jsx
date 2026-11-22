import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";
import styles from "./../home/Home.module.scss";
import { Input } from "../../utils/input/Input"; 
import { updateTodoListAPI } from "../../fireBase/userAPI";
import { loginOut } from "../../fireBase/auth";


export const Home = () => {
  const { user, todo, updateUserTodoList } = useUser();
  const [text, setText] = useState('')
  const [filter, setFilter] = useState("all");


  const saveTodoList = async (newTodoList) => {
    const response = await updateTodoListAPI(newTodoList)

    if (!response.ok) {
      console.log("Firestore Error:", response.text);
      return;
    }
    
    updateUserTodoList(response.data);
  }


  const addTodo = async  () => {
    if (!text.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      text: text,
      isComplete: false,
    }

    const newTodoList = [...todo, newTodo]
    

    await saveTodoList(newTodoList)
    setText("");
  }

  const deleteTodo = async (id) => {
    const newTodoList = todo.filter(item => item.id !== id )

 
    await saveTodoList(newTodoList)
  }

  const isFinished = async (id) => {
    const newTodoList = todo.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isComplete: !item.isComplete
        };
      }
  
      return item;
    });
    
 
    await saveTodoList(newTodoList);
    
  }


  const clearCompletedTodo = async () => {
    const newTodoList = todo.filter(item => !item.isComplete )
    await saveTodoList(newTodoList)
  }

  const filteredTodoList = todo.filter((item) => {
    if (filter === "active") {
      return !item.isComplete;
    }
  
    if (filter === "completed") {
      return item.isComplete;
    }
  
    return true;
  });


  const totalTasks = todo.length;

  const completedTasks = todo.filter(
    item => item.isComplete
  ).length;

  const progress = totalTasks
    ? (completedTasks / totalTasks) * 100
    : 0;


    const handleLogout = async () => {
      try {
          await loginOut();
      } catch (error) {
          console.log("Ошибка выхода:", error);
      }
  };


  return (
    <>
      <section className={styles.todoList}>
        <div className={styles.container}>
          <header className={styles.header}>
            <div>
              <h1>My Tasks</h1>
              <p>Organize your day and stay productive.</p>
              <button onClick={handleLogout}>Log Out</button>
            </div>

            <div className={styles.avatar}>
              {user.name?.slice(0, 2).toUpperCase()}
            </div>
            
          </header>

          <div className={styles.progress}>
            <div className={styles.progressInfo}>
              <h3>Your progress</h3>
              <span> {completedTasks} of {totalTasks} completed</span>
            </div>

            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.addTask}>
            <Input
              value={text}
              setValue={setText}
              type="text"
              placeholder="What needs to be done?"
              autoComplete="email"
              required="required"
            />

            <button 
              onClick={addTodo}
              type="button"
              >+ Add Task</button>
          </div>

          <div className={styles.filters}>
            <button 
              onClick={() => setFilter("all")} 
              className={filter === "all" ? styles.active : ""}
              >All</button>
            <button 
              onClick={() => setFilter("active")}
              className={filter === "active" ? styles.active : ""}
              >Active</button>
            <button 
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? styles.active : ""}
              >Completed</button>
          </div>



          {filteredTodoList.map(item => {
            return(
              <div  key={item.id} className={styles.taskList}>
                <div className={styles.task}>
                  <div className={styles.taskContent}>
                  <input
                    type="checkbox"
                    checked={item.isComplete}
                    onChange={() => isFinished(item.id)}
                  />
                    <span>{item.text}</span>
                  </div>
    
                  <button onClick={() => deleteTodo(item.id)} className={styles.deleteButton}>Delete</button>
                </div>
              </div>
            )
              
            
          })}
          





          <footer className={styles.footer}>
            <span>{totalTasks} tasks total</span>
            <button onClick={clearCompletedTodo} type="button">Clear completed</button>
          </footer>
        </div>
      </section>
    </>
  );
};
