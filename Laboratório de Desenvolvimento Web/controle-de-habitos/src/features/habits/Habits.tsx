import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import {
  addHabit,
  editHabit,
  toggleHabit,
  deleteHabit,
  clearCompleted,
  setFilter,
} from "./habitsSlice";

import {
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const Habits: React.FC = () => {
  const dispatch = useDispatch();
  const { items, filter } = useSelector((state: RootState) => state.habits);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const filteredItems = filter
    ? items.filter((h) => h.category === filter)
    : items;

  const handleSubmit = () => {
    if (!name.trim()) return;
    if (editId) {
      dispatch(editHabit({ id: editId, name, category }) as any);
      setEditId(null);
    } else {
      dispatch(addHabit({ name, category }) as any);
    }
    setName("");
    setCategory("");
  };

  return (
    <div>
      {/* Formulário */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          label="Hábito"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          {editId ? "Salvar" : "Adicionar"}
        </Button>
      </div>

      {/* Filtro */}
      <Select
        value={filter || ""}
        onChange={(e) => dispatch(setFilter(e.target.value || null))}
        displayEmpty
      >
        <MenuItem value="">Todas</MenuItem>
        <MenuItem value="Saúde">Saúde</MenuItem>
        <MenuItem value="Estudo">Estudo</MenuItem>
        <MenuItem value="Lazer">Lazer</MenuItem>
      </Select>

      {/* Lista de hábitos */}
      <List>
        {filteredItems.map((habit) => (
          <ListItem
            key={habit.id}
            secondaryAction={
              <>
                <IconButton
                  onClick={() => {
                    setEditId(habit.id);
                    setName(habit.name);
                    setCategory(habit.category || "");
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton onClick={() => dispatch(deleteHabit(habit.id) as any)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <Checkbox
              checked={habit.completed}
              onChange={() => dispatch(toggleHabit(habit.id) as any)}
            />
            <ListItemText
              primary={habit.name}
              secondary={habit.category}
              style={{
                textDecoration: habit.completed ? "line-through" : "none",
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Botão limpar concluídos */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => dispatch(clearCompleted() as any)}
      >
        Limpar concluídos
      </Button>
    </div>
  );
};

export default Habits;
