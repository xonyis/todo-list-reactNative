import AsyncStorage from "@react-native-async-storage/async-storage";

// Clé pour stocker les tâches dans AsyncStorage
const TASKS_STORAGE_KEY = "@todo_tasks";

// Fonction pour sauvegarder les tâches
export const saveTasks = async (tasks) => {
  try {
    const jsonTasks = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonTasks);
    console.log("Tâches sauvegardées avec succès");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des tâches:", error);
  }
};

// Fonction pour charger les tâches
export const loadTasks = async () => {
  try {
    const jsonTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    if (jsonTasks !== null) {
      const tasks = JSON.parse(jsonTasks);
      console.log("Tâches chargées avec succès");
      return tasks;
    } else {
      console.log("Aucune tâche trouvée, utilisation des tâches par défaut");
      return [
        { id: 1, text: "Doctor Appointment", completed: true },
        { id: 2, text: "Meeting at School", completed: false },
      ];
    }
  } catch (error) {
    console.error("Erreur lors du chargement des tâches:", error);
    // Retourner les tâches par défaut en cas d'erreur
    return [
      { id: 1, text: "Doctor Appointment", completed: true },
      { id: 2, text: "Meeting at School", completed: false },
    ];
  }
};

// Fonction pour effacer toutes les tâches
export const clearTasks = async () => {
  try {
    await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
    console.log("Toutes les tâches ont été supprimées");
  } catch (error) {
    console.error("Erreur lors de la suppression des tâches:", error);
  }
};
