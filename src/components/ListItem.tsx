import React, {useState} from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ITask} from '../interfaces/ITask';

interface ListItemProps {
  item: ITask;
  onDelete: (id: number) => void;
  onToggleCompleted: (id: number) => void;
  onEditCompleted: (id: number, newText: string) => void;
}

const ListItem = ({
  item,
  onDelete,
  onToggleCompleted,
  onEditCompleted,
}: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);

  const handleEdit = () => {
    onEditCompleted(item.id, editedText);
    setIsEditing(false);
  };
  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.editInput}
          value={editedText}
          onChangeText={text => setEditedText(text)}
        />
      ) : (
        <Text>{item.text}</Text>
      )}
      <Switch
        value={item.completed}
        onValueChange={() => onToggleCompleted(item.id)}
      />

      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={styles.deleteButton}>Eliminar</Text>
      </TouchableOpacity>
      {isEditing ? (
        <TouchableOpacity onPress={handleEdit}>
          <Text style={styles.editButton}>Guardar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'center',
  },
  editInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 5,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
  editButton: {
    color: 'blue',
    marginLeft: 10,
  },
});

export default ListItem;
