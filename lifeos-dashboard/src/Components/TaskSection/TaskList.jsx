import { useEffect } from "react";

  // Function to delete a task by index
const handleDelete = (id) => {
  setTasks((prev) => prev.filter(task => task.id !== id));
};

  // Function to edit a task by index
 const handleEdit = (id, newText) => {
  setTasks(prev =>
    prev.map(task =>
      task.id === id ? { ...task, text: newText } : task
    )
  );
};

  // Function to handle task completion (toggle)
  const toggleComplete = (id) => {
  setTasks((tasks) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );
    console.log("Updated tasks:", updated); // check this
    return updated;
  });
};

// Handle drag-and-drop reordering
const handleDragEnd = (result) => {
  // If dropped outside list → do nothing
  if (!result.destination) return;

  // Step 1: Reorder visible tasks
  const items = Array.from(filteredTasks);
  const [movedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, movedItem);

  // Step 2: Update main tasks state (THIS is your code)
  setTasks((prev) => {
    const newTasks = [...prev];

    items.forEach((item, index) => {
      const originalIndex = newTasks.findIndex(t => t.id === item.id);
      newTasks.splice(originalIndex, 1);
      newTasks.splice(index, 0, item);
    });

    return newTasks;
  });
};
  
