// components/TodoList.js
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import TodoItem from "./TodoItem";
import styles from "../styles.js";
import { saveTasks, loadTasks, clearTasks } from "../utils/storage.js";

export default function TodoList() {
  // State Hooks
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Charger les tâches au démarrage de l'application
  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  // Sauvegarder les tâches à chaque modification
  useEffect(() => {
    if (!isLoading) {
      saveTasksToStorage();
    }
  }, [tasks, isLoading]);

  // Fonction pour charger les tâches depuis AsyncStorage
  const loadTasksFromStorage = async () => {
    try {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour sauvegarder les tâches dans AsyncStorage
  const saveTasksToStorage = async () => {
    try {
      await saveTasks(tasks);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    }
  };

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
    Alert.alert(
      "Supprimer la tâche",
      "Êtes-vous sûr de vouloir supprimer cette tâche ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => setTasks(tasks.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Fonction pour effacer toutes les tâches
  const clearAllTasks = () => {
    Alert.alert(
      "Effacer toutes les tâches",
      "Êtes-vous sûr de vouloir effacer toutes les tâches ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Effacer",
          style: "destructive",
          onPress: async () => {
            await clearTasks();
            setTasks([]);
          },
        },
      ]
    );
  };

  // Afficher un indicateur de chargement
  if (isLoading) {
    return (
      <View
        style={[
          styles.todo_container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ fontSize: 18, color: "#666" }}>Chargement...</Text>
      </View>
    );
  }

  // Render TodoList Component
  return (
    <View style={styles.todo_container}>
      <View style={styles.header}>
        <Text style={styles.header_title}>Mes Tâches</Text>
        {tasks.length > 0 && (
          <TouchableOpacity style={styles.clear_button} onPress={clearAllTasks}>
            <Text style={styles.clear_button_text}>Effacer tout</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={{ flex: 1 }}>
        {tasks.length === 0 ? (
          <View style={styles.empty_state}>
            <Text style={styles.empty_state_text}>
              Aucune tâche pour le moment
            </Text>
            <Text style={styles.empty_state_subtext}>
              Ajoutez votre première tâche ci-dessous
            </Text>
          </View>
        ) : (
          tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
            />
          ))
        )}
      </ScrollView>

      <View style={styles.input_container}>
        <TextInput
          style={styles.text_input}
          value={text}
          onChangeText={setText}
          placeholder="Nouvelle tâche"
          placeholderTextColor="#999"
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.add_button} onPress={addTask}>
          <Text style={styles.add_button_text}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
