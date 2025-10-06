// src/components/notes/Note.jsx
import { useContext, useState } from "react";
import { Card, CardContent, CardActions, Typography, Chip, Box, IconButton, Popover, List, ListItem, ListItemText, Checkbox, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import './Note.css';
import {
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
  LabelOutlined as Label,
  //EditOutlined as Edit//
} from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";

const StyledCard = styled(Card)`
  border: 1px solid #2E2E2E;
  border-radius: 8px;
  width: 240px;
  margin: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  background-color: #1E1E1E;
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

const Note = ({ note }) => {
  const { archiveNote, deleteNote, updateNoteLabels, labels, addLabel } = useContext(DataContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  //const [openEdit, setOpenEdit] = useState(false);//
  //const [editedNote, setEditedNote] = useState({ ...note });//

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
    <StyledCard className="note-card">
      <CardContent>
        <Typography className="note-title" sx={{fontWeight: 'bold', fontSize: '1.2rem' }}>{note.heading}</Typography>
        <Typography className="note-content" dangerouslySetInnerHTML={{__html: note.text}}/>
        <Box className="note-labels" sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: 1 }}>
          {note.labels && note.labels.map(labelName => {
            const label = labels.find(l => l.name === labelName);
            return (
              <Box key={labelName} onClick={(e) => e.stopPropagation()}>
                <Chip
                  className="note-label-chip"
                  label={labelName}
                  size="small"
                  variant="outlined"
                  onDelete={() => handleLabelDelete(labelName)}
                  style={{
                    backgroundColor: label ? label.color : '#e0e0e0',
                    color: '#FFFFFF',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
            );
          })}
        </Box>
        
      </CardContent>
      <CardActions>
        <IconButton aria-describedby={id} onClick={(e) => { e.stopPropagation(); handleLabelClick(e); }}>
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
            }}
        >
            <Box sx={{ p: 2, width: 200 }} onClick={(e) => e.stopPropagation()}>
                <Typography sx={{ mb: 1 }}>Label note</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Enter label name"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        onKeyPress={(e) => { if (e.key === 'Enter') { handleCreateNewLabel(); } }}
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
          onClick={(e) => {e.stopPropagation();archiveNote(note)}}
        />
        <Delete fontSize="small" onClick={(e) => {e.stopPropagation();deleteNote(note)}} />
      </CardActions>
    </StyledCard>
  );
};

export default Note;
