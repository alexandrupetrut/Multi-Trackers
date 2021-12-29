import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { useState, useEffect } from 'react'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks();;
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3333/tasks')
    const data = await res.json()
    return data
  }

    // Fetch Task
    const fetchTask = async (id) => {
      const res = await fetch('http://localhost:3333/tasks/' +id)
      const data = await res.json()
      return data
    }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:3333/tasks', 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch('http://localhost:3333/tasks/' + id, 
    {
      method: 'DELETE'
    })
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch('http://localhost:3333/tasks/' + id,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map(task => task.id === id
      ? { ...task, reminder: data.reminder }
      : task
    ))
  }

  return (
    <Router>

      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>

        <Footer />
      </div>

    </Router>
  )
}

export default App