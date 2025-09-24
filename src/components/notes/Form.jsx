import { useState, useRef, useContext } from "react";
import { Box, TextField, ClickAwayListener, Autocomplete, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";
import { DataContext } from "../../context/DataProvider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%),
    0 2px 6px 2px rgb(60 64 67 / 15%);
  border-color: #ddd4d4ff;
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

    // If form is totally empty, reset and exit
    if (!newNote.heading && !newNote.text && newNote.labels.length === 0) {
      setNewNote({ ...noteTemplate, id: uuid() });
      return;
    }

    // Require title
    if (!newNote.heading) {
      showNotification("Note must have a title.", "error");
      return;
    }

    // Save note
    try {
      // Add new labels if needed
      const existingLabelNames = labels.map((l) => l.name);
      newNote.labels.forEach((label) => {
        if (!existingLabelNames.includes(label)) {
          addLabel(label);
        }
      });

      await addNote({
        ...newNote,
        createdAt: new Date(),
      });

      showNotification("Note saved successfully!", "success");
    } catch (error) {
      console.error("Error adding note:", error);
      showNotification("Error saving note.", "error");
    }

    // Reset form with new ID
    setNewNote({ ...noteTemplate, id: uuid() });
  };

  const onTextAreaClick = () => {
    setShowTextField(true);
    if (containerRef.current) {
      containerRef.current.style.minHeight = "70px";
    }
  };

  const onTitleChange = (e) => {
    setNewNote({ ...newNote, heading: e.target.value });
  };

  const onTextChange = (content) => {
    setNewNote({ ...newNote, text: content });
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
            onChange={onTitleChange}
            name="heading"
            value={newNote.heading || ""}
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Take a note..."
          multiline
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onClick={onTextAreaClick}
          onChange={onTextChange}
          onFocus={onTextAreaClick}
          name="text"
          value={newNote.text || ""}
        />
        {showTextField && (
          <Box sx={{ marginTop: "10px" }}>
            <Autocomplete
              multiple
              freeSolo
              options={labels.map((option) => option.name)}
              value={newNote.labels}
              onChange={onLabelChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
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
