import React from "react";
import { useState } from "react";
import { useUser } from "../../context/userContext";
import styles from "./../home/Home.module.scss";
import { Input } from "../../utils/input/Input"; 
import { deleteTodoAPI, updateTodoListAPI, getTodoListAPI } from "../../fireBase/userAPI";
import { loginOut } from "../../fireBase/auth";
import { createNewTodoListAPI } from "../../fireBase/userAPI";

import { ContModal } from "../../utils/contModal/ContModal";
import { EditModal } from "../../utils/editModal/EditModal";


export const Home = () => {
  const { user, todo, updateUserTodoList, updateOneTodoList } = useUser();
  const [text, setText] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState("all");

  const [isContModal, setIsContModal] = useState({
    id: null,
    clientX: null,
    clientY: null,
    is:false
  })
  const [isEditModal, setIsEditModal] = useState(false)



  const addTodo = async () => {
    if (!text.trim()) return;
    const isExist = todo.some(item => item.text == text)
    if (isExist) return console.log('already exist');

    const newTodo = {
      text: text,
      isComplete: false,
    }
    const newTodoID = Date.now().toString()

    const responseCreateTodo = await createNewTodoListAPI(user.uid, newTodoID, newTodo)
    console.log(responseCreateTodo.data);

    const responseTodoList = await getTodoListAPI(user.uid) 
    console.log(responseTodoList.data);
    updateUserTodoList(responseTodoList.data)
  }

  const deleteTodo = async (id) => {

    const response = await deleteTodoAPI(id);
    if (response.ok) {
    const newTodoList = todo.filter(item => item.id !== id )
    updateUserTodoList(newTodoList)
    } else {
      console.log(response.text);
    }
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

    const updatedTodo = newTodoList.find(item => item.id === id);

  if (!updatedTodo) return;

  const response = await updateTodoListAPI(id, {
    isComplete: updatedTodo.isComplete
  });
  if (response.ok) {
    updateUserTodoList(newTodoList);
  } else {
    console.log(response.text);
  }
    
  }


  const clearCompletedTodo = async () => {
    const notCompletedTodoList = todo.filter(item => !item.isComplete )
    const newTodoList = todo.filter(item => item.isComplete )
    newTodoList.map(item => {
      deleteTodoAPI(item.id);
    })
    updateUserTodoList(notCompletedTodoList);
  }

  const filteredTodoList = todo.filter((item) => {

    if(!item.text.includes(search)){
      return false;
    }
      if (filter === "active") {
        return !item.isComplete;
      }
    
      if (filter === "completed") {
        return item.isComplete;
      }

    
  
    return true;
  });

  const searching = (e) => {
    setSearch(e.target.value)
    // const searchingTodos = todo.filter(item => item.text.includes(searchText))
    // console.log(searchingTodos.length);
  } 


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


  const onContMenu = (e, id, text) => {
    e.preventDefault()
    console.log(id);

    setIsContModal({
      text,
      id,
      clientX: e.clientX,
      clientY: e.clientY,
      is: true
    })
  }

  const onEdit = () => {
    setIsContModal({
      ...isContModal,
      clientX: null,
      clientY: null,
      is: false
    })

    setIsEditModal(true)
  }

  const onConfirm =  async  (newValue) => {
    const editElem = todo.find(item => item.id === isContModal.id)
    editElem.text = newValue
    console.log(editElem);
    const response = await updateTodoListAPI(editElem.id, editElem)
    
    if (response.ok) {
      updateUserTodoList([...todo])
      setIsEditModal(false)  
    } else {
      console.log(response.text);
    }

  }

  



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

              <input
                value={search}
                onChange={searching}
                type="text"
                placeholder="Search todo"
              />
            </div>
          



          {filteredTodoList.map(item => {
            return(
              <div onContextMenu={(e) => onContMenu(e, item.id, item.text)} key={item.id} className={styles.taskList}>
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


    
      {isContModal.is && 
          <ContModal
            clientX={isContModal.clientX}
            clientY={isContModal.clientY}
            onEdit={onEdit}
          />

      }

      {isEditModal && 
        <EditModal
          onCancel={() => setIsEditModal(false)}
          onConfirm={onConfirm}
          oldValue={isContModal.text}
        />
        
      }
      

    </>
  );
};
