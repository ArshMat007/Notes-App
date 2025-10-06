import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './Notes.css';
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
                <div
                  className="notes-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {notesToDisplay.map((note, index) => (
                    <Draggable
                      key={note.id}
                      draggableId={String(note.id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Note note={note} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
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
