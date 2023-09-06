import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
interface InputTProps {
  addTask: (text: string) => void; // Recibe la función onAddTask como prop
}
const InputTask: React.FC<InputTProps> = ({addTask}) => {
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      addTask(taskText);
      setTaskText('');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Agregar Tarea"
        value={taskText}
        onChangeText={text => setTaskText(text)}
      />
      <Button title="Agregar" onPress={handleAddTask} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 4,
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    marginRight: 8,
  },
});
export default InputTask;
