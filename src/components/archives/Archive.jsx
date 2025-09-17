import { useContext } from 'react';
import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UnarchiveOutlined as Unarchive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`;

const Archive = ({ note }) => {
    const { unArchiveNote, deleteNote } = useContext(DataContext);

    return (
        <StyledCard>
            <CardContent>
                <Typography>{note.heading}</Typography>
                <Typography>{note.text}</Typography>
            </CardContent>
            <CardActions>
                <Unarchive 
                    fontSize="small" 
                    style={{ marginLeft: 'auto' }} 
                    onClick={() => unArchiveNote(note)} // This will now call the context function
                />
                <Delete 
                    fontSize="small"
                    onClick={() => deleteNote(note)} // This will now call the context function
                />
            </CardActions>
        </StyledCard>
    );
};

export default Archive;
