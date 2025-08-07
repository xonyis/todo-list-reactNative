// components/TodoItem.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles.js"; // Import the styles

export default function TodoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <View style={styles.todo_item}>
      <TouchableOpacity
        style={[styles.checkbox, task.completed && styles.checkbox_checked]}
        onPress={() => toggleCompleted(task.id)}
      >
        {task.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <Text style={[styles.todo_item_text, task.completed && styles.completed]}>
        {task.text}
      </Text>
      <TouchableOpacity
        style={styles.delete_button}
        onPress={() => deleteTask(task.id)}
      >
        <Text style={{ color: "#fff" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
