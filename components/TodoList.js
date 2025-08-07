// components/TodoList.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import TodoItem from "./TodoItem";
import styles from "../styles.js"; // Import the styles

export default function TodoList() {
  // State Hooks
  const [tasks, setTasks] = useState([
    { id: 1, text: "Doctor Appointment", completed: true },
    { id: 2, text: "Meeting at School", completed: false },
  ]);
  const [text, setText] = useState("");

  // Function to Add Task
  function addTask() {
    if (text.trim()) {
      const newTask = { id: Date.now(), text: text.trim(), completed: false };
      setTasks([...tasks, newTask]);
      setText("");
    }
  }

  // Function to Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Render TodoList Component
  return (
    <View style={styles.todo_container}>
      <ScrollView style={{ flex: 1 }}>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </ScrollView>

      <View style={styles.input_container}>
        <TextInput
          style={styles.text_input}
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.add_button} onPress={addTask}>
          <Text style={styles.add_button_text}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
