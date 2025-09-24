// src/components/notes/Note.jsx
import { useContext, useState } from "react";
import { Card, CardContent, CardActions, Typography, Chip, Box, IconButton, Popover, List, ListItem, ListItemText, Checkbox, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
  LabelOutlined as Label,
} from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";

const StyledCard = styled(Card)`
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  width: 240px;
  margin: 8px;
  box-shadow: box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
`;

const Note = ({ note }) => {
  const { archiveNote, deleteNote, updateNoteLabels, labels, addLabel } = useContext(DataContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [newLabel, setNewLabel] = useState('');

  const handleLabelClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLabelClose = () => {
    setAnchorEl(null);
  };

  const handleToggleLabel = (labelName) => {
    const currentLabels = note.labels || [];
    const newLabels = currentLabels.includes(labelName)
      ? currentLabels.filter(l => l !== labelName)
      : [...currentLabels, labelName];
    updateNoteLabels(note.id, newLabels);
  }; //is responsible for the logic of adding a label to a note if it doesn't have it, 
  // or removing it if it already does. It "toggles" the label on or off for that specific note//

  const handleCreateNewLabel = () => {
    if (newLabel && !labels.find(l => l.name === newLabel)) {
        addLabel(newLabel);
    }
    if (newLabel) {
        handleToggleLabel(newLabel);
    }
    setNewLabel('');
  } //Creates a new label if it doesn’t already exist Then toggles (adds) it to the note Clears the input field//

  const open = Boolean(anchorEl);
  const id = open ? 'label-popover' : undefined;

  const handleLabelDelete = (labelToDelete) => {
    const newLabels = note.labels.filter(label => label !== labelToDelete);
    updateNoteLabels(note.id, newLabels);
  }//Called when a label chip’s delete icon is clicked.//

  return (
    <StyledCard>
      <CardContent>
        <Typography>{note.heading}</Typography>
        <Typography dangerouslySetInnerHTML={{__html: note.text}}/>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: 1 }}>
          {note.labels && note.labels.map(labelName => {
            // For each label name on the note, find the full label object from the context
            // to retrieve its color. Then, render a Chip component with the label's name,
            // its assigned color, and a delete handler.
            const label = labels.find(l => l.name === labelName);
            return (
              <Chip
                key={labelName}
                label={labelName}
                size="small"
                variant="outlined"
                onDelete={() => handleLabelDelete(labelName)}
                style={{ backgroundColor: label ? label.color : '#e0e0e0' }}
              />
            );
          })}
        </Box>
      </CardContent>
      <CardActions>
        <IconButton aria-describedby={id} onClick={handleLabelClick}>
            <Label fontSize="small" />
        </IconButton>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleLabelClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}//Text field: input for a new label List: all existing labels with checkboxes 
            // showing if they’re attached to this note//
        >
            <Box sx={{ p: 2, width: 200 }}>
                <Typography sx={{ mb: 1 }}>Label note</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField 
                        fullWidth
                        variant="standard" 
                        placeholder="Enter label name"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCreateNewLabel()}
                    />
                </Box>
                <List>
                    {labels.map(label => (
                        <ListItem key={label.id} dense disablePadding>
                            <Checkbox 
                                checked={note.labels?.includes(label.name) || false}
                                onChange={() => handleToggleLabel(label.name)}
                            />
                            <ListItemText primary={label.name} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Popover>
        <Archive
          fontSize="small"
          style={{ marginLeft: "auto" }}
          onClick={() => archiveNote(note)}
        />
        <Delete fontSize="small" onClick={() => deleteNote(note)} />
      </CardActions>
    </StyledCard>
  );
};

export default Note;
