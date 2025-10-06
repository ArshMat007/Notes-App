import { useState, useRef, useContext } from "react";
import { Box, TextField, ClickAwayListener, Autocomplete, Chip, GlobalStyles } from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";
import { DataContext } from "../../context/DataProvider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid #2E2E2E;
  background-color: #1E1E1E;
  width: 600px;
  border-radius: 8px;
  min-height: 30px;
  padding: 10px 15px;
`;

const getNewNote = () => ({
  id: uuid(),
  heading: "",
  text: "",
  labels: [],
  archive: false,
  deleted: false,
});

const Form = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [newNote, setNewNote] = useState(getNewNote());

  const { addNote, labels, addLabel, showNotification } = useContext(DataContext);

  const containerRef = useRef();

  const handleClickAway = async () => {
    if (!newNote.heading && !newNote.text && newNote.labels.length === 0) {
      setNewNote(getNewNote());
      setShowTextField(false);
      if (containerRef.current) containerRef.current.style.minHeight = "30px";
      return;
    }

    if (!newNote.heading) {
      showNotification("Note must have a title.", "error");
      return;
    }

    try {
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

    const freshNote = getNewNote();
    setNewNote(freshNote);
    setShowTextField(false);
    if (containerRef.current) containerRef.current.style.minHeight = "30px";
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
        <GlobalStyles
          styles={{
            '.ql-toolbar': {
              backgroundColor: '#2D3748',
              border: '1px solid #4A5568 !important',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
            },
            '.ql-container': {
              border: '1px solid #4A5568 !important',
              borderBottomLeftRadius: '4px',
              borderBottomRightRadius: '4px',
            },
            '.ql-editor': {
              color: '#E5E7EB',
            },
            '.ql-editor.ql-blank::before': {
              color: '#A0AEC0 !important',
              fontStyle: 'normal',
            },
            '.ql-snow .ql-stroke': {
              stroke: '#E5E7EB !important',
            },
            '.ql-snow .ql-picker-label': {
              color: '#E5E7EB !important',
            },
            '.ql-snow .ql-fill': {
              fill: '#E5E7EB !important',
            }
          }}
        />
        {showTextField && (
          <TextField
            placeholder="Title"
            variant="standard"
            InputProps={{ disableUnderline: true, style: { color: '#E5E7EB' } }}
            sx={{
                marginBottom: '10px',
                '& .MuiInputBase-input::placeholder': {
                    color: '#E5E7EB',
                    opacity: 1,
                },
                '& .MuiInputBase-input': {
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                },
            }}
            onChange={onTitleChange}
            name="heading"
            value={newNote.heading || ""}
          />
        )}
        {showTextField ? (
          <ReactQuill
            key={newNote.id}
            theme="snow"
            placeholder="Take a note..."
            multiline
            onChange={onTextChange}
            value={newNote.text || ""}
          />
        ) : (
          <TextField
            placeholder="Take a note..."
            variant="standard"
            InputProps={{ disableUnderline: true }}
            onClick={onTextAreaClick}
            value=""
            sx={{
                '& .MuiInputBase-input::placeholder': {
                    color: '#A0AEC0',
                    opacity: 1,
                },
                '& .MuiInputBase-input': {
                    fontWeight: '500',
                    color: '#E5E7EB',
                },
            }}
          />
        )}
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
                  InputProps={{ ...params.InputProps, disableUnderline: true, style: { color: '#E5E7EB' } }}
                  placeholder="Add labels..."
                  sx={{
                    '& .MuiInputBase-input::placeholder': {
                        color: '#E5E7EB',
                        opacity: 1,
                    },
                  }}
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
