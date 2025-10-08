import { useContext } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { DataContext } from '../../context/DataProvider';
import Archive from './Archive';
import '../notes/Notes.css'; // Import the CSS file

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Archives = () => {
    const { archiveNotes, searchQuery } = useContext(DataContext);

    const filteredArchives = searchQuery 
        ? archiveNotes.filter(note => 
            new RegExp(searchQuery, 'i').test(note.heading) || new RegExp(searchQuery, 'i').test(note.text)
          ) 
        : archiveNotes;

    const onDragEnd = (result) => {
        // Reordering logic can be added here if needed in the future
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable-archives">
                        {(provided) => (
                            <div
                                className="notes-container"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {filteredArchives.map((archive, index) => (
                                    <Draggable key={archive.id} draggableId={String(archive.id)} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Archive note={archive} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
        </Box>
    );
};

export default Archives;
