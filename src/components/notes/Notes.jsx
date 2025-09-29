// Displaying the form to create a new note.
// Fetching all of your notes from the global state.
// Filtering those notes based on whether you've selected a label or are searching for something.
// Displaying the filtered notes in a grid.
// Allowing you to drag and drop the notes to reorder them.
// Showing a message if there are no notes to display.
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { DataContext } from '../../context/DataProvider';
import { reorder } from '../../utils/common-utils';

// components
import Form from './Form';
import Note from './Note';
import EmptyNotes from './EmptyNotes';

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Notes = () => {
  const { notes, setNotes, searchQuery } = useContext(DataContext);
  const { labelName } = useParams();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = reorder(notes, result.source.index, result.destination.index);
    setNotes(items);
  };

  let notesToDisplay = notes; //filtering logic

  // Apply search filter first
  if (searchQuery) {
    try {
        const regex = new RegExp(searchQuery, 'i');
        notesToDisplay = notes.filter(note => 
            regex.test(note.heading) || regex.test(note.text)
        );
    } catch (e) {
        console.error("Invalid regex:", e);
    }
  }

  // Then, apply label filtering on the (potentially) search-filtered list
  if (labelName) {
      notesToDisplay = notesToDisplay.filter(note => note.labels && note.labels.includes(labelName));
  }

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ p: 3, width: '100%' }}>
        <DrawerHeader />
        <Form />
        {notesToDisplay.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <Grid
                  container
                  style={{ marginTop: 16 }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {notesToDisplay.map((note, index) => (
                    <Draggable
                      key={note.id}
                      draggableId={String(note.id)}
                      index={index}//note display logic
                    >
                      {(provided, snapshot) => (
                        <Grid
                          item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Note note={note} />
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <EmptyNotes />
        )}
      </Box>
    </Box>
  );
};

export default Notes;