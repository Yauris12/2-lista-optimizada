import React, {useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {styles} from './theme/appTheme';
import ListItem from './src/components/ListItem';
import {ITask} from './src/interfaces/ITask';
import InputTask from './src/components/InputTask';

const taskList: ITask[] = [
  {id: 1, text: 'Realizar el login', completed: false},
  {id: 2, text: 'Registrar Producto', completed: false},
  {id: 3, text: 'Carrito de Compras', completed: false},
];

const App = () => {
  const [task, setTask] = useState<ITask[]>(taskList);

  const toggleCompleted = (id: number) => {
    const newData = task.map(item =>
      item.id === id ? {...item, completed: !item.completed} : item,
    );
    setTask(newData);
  };
  const deleteItem = (id: number) => {
    const newData = task.filter(item => item.id !== id);
    setTask(newData);
  };

  const editCompleted = (id: number, newText: string) => {
    const newData = task.map(item =>
      item.id === id ? {...item, text: newText} : item,
    );
    setTask(newData);
  };

  const addTask = (newText: string) => {
    // Genera un nuevo ID para la tarea
    const newId = Math.max(...task.map(item => item.id), 0) + 1;
    const newTask: ITask = {id: newId, text: newText, completed: false};
    setTask([...task, newTask]);
  };

  return (
    <SafeAreaView style={styles.fondo}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />

      <View style={styles.header}>
        <Text style={styles.title}>Lista de Tareas</Text>
      </View>
      <InputTask addTask={addTask} />

      <FlatList
        data={task}
        keyExtractor={item => item.id.toString()} // Usamos toString() para evitar problemas de tipo
        renderItem={({item}) => (
          <ListItem
            item={item}
            onDelete={deleteItem}
            onToggleCompleted={toggleCompleted}
            onEditCompleted={editCompleted}
          />
        )} // Renderiza cada elemento utilizando la función renderTaskItem
      />
    </SafeAreaView>
  );
};

export default App;
