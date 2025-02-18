import React, { useState } from "react";
import { View, Text, TextInput, Button, Clipboard, ScrollView, TouchableOpacity } from "react";

export default function TaskManager() {
  const [folders, setFolders] = useState({});
  const [folderInput, setFolderInput] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [filteredFolder, setFilteredFolder] = useState("");

  const addFolder = () => {
    if (!folderInput) return;
    setFolders({ ...folders, [folderInput]: [] });
    setFolderInput("");
  };

  const addTask = () => {
    if (!taskInput || !selectedFolder) return;
    setFolders({
      ...folders,
      [selectedFolder]: [
        ...folders[selectedFolder],
        { name: taskInput, status: "OPEN", response: "" },
      ],
    });
    setTaskInput("");
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter folder name"
        value={folderInput}
        onChangeText={setFolderInput}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Add Folder" onPress={addFolder} />

      <TextInput
        placeholder="Enter task name"
        value={taskInput}
        onChangeText={setTaskInput}
        style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
      />
      <Button title="Add Task" onPress={addTask} />

      {Object.entries(folders).map(([folder, tasks]) => (
        <View key={folder} style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{folder}</Text>
          {tasks.map((task, index) => (
            <TouchableOpacity key={index} onPress={() => copyToClipboard(task.name)}>
              <Text style={{ padding: 10, backgroundColor: "lightgray", marginTop: 5 }}>
                {task.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
