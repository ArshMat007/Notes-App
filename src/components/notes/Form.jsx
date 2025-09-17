import { useState, useRef, useContext } from "react";
import { Box, TextField, ClickAwayListener, Autocomplete, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";
import { DataContext } from "../../context/DataProvider";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  border-color: #e0e0e0;
  width: 600px;
  border-radius: 8px;
  min-height: 30px;
  padding: 10px 15px;
`;

const noteTemplate = {
  id: uuid(),
  heading: "",
  text: "",
  labels: [],
  archive: false,
  deleted: false,
};

const Form = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [newNote, setNewNote] = useState({ ...noteTemplate });

  const { addNote, labels, addLabel, showNotification } = useContext(DataContext);

  const containerRef = useRef();

  const handleClickAway = async () => {
    setShowTextField(false);
    if (containerRef.current) {
      containerRef.current.style.minHeight = "30px";
    }

    // If the form is totally empty, just close it without an error.
    if (!newNote.heading && !newNote.text && newNote.labels.length === 0) {
        setNewNote({ ...noteTemplate, id: uuid() }); // Reset form
        return;
    }

    // If there's some content but no title, show an error.
    if (!newNote.heading) {
        showNotification('Note must have a title.', 'error');
        return;
    }

    // If validation passes, proceed with saving.
    if (newNote.heading || newNote.text || newNote.labels.length > 0) {
      // Find any new labels that were added and create them
      const existingLabelNames = labels.map(l => l.name);
      newNote.labels.forEach(label => {
        if (!existingLabelNames.includes(label)) {
          addLabel(label);
        }
      });

      try {
        await addNote({
          ...newNote,
          createdAt: new Date(),
        });
        showNotification('Note saved successfully!', 'success');
      } catch (error) {
        console.error("Error adding note:", error);
        showNotification('Error saving note.', 'error');
      }
    }

    setNewNote({ ...noteTemplate, id: uuid() }); // Reset form with a new ID
  };

  const onTextAreaClick = () => {
    setShowTextField(true);
    if (containerRef.current) {
      containerRef.current.style.minHeight = "70px";
    }
  };

  const onTextChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const onLabelChange = (event, value) => {
    setNewNote({ ...newNote, labels: value });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container ref={containerRef}>
        {showTextField && (
          <TextField
            placeholder="Title"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            style={{ marginBottom: 10 }}
            onChange={onTextChange}
            name="heading"
            value={newNote.heading || ""}
          />
        )}
        <TextField
          placeholder="Take a note..."
          multiline
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onClick={onTextAreaClick}
          onChange={onTextChange}
          name="text"
          value={newNote.text || ""}
        />
        {showTextField && (
          <Box sx={{ marginTop: '10px' }}>
            <Autocomplete
              multiple
              freeSolo // Allows creating new labels
              options={labels.map(option => option.name)} // Suggestions from existing labels
              value={newNote.labels}
              onChange={onLabelChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                  placeholder="Add labels..."
                />
              )}
            />
          </Box>
        )}
      </Container>
    </ClickAwayListener>
  );
};

export default Form;