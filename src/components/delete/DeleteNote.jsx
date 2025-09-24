import { useContext } from 'react';
import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`;

const DeleteNote = ({ note }) => {
    const { restoreNote, removeNote } = useContext(DataContext);

    return (
        <StyledCard>
            <CardContent>
                <Typography>{note.heading}</Typography>
                <Typography dangerouslySetInnerHTML={{ __html: note.text }} />
            </CardContent>
            <CardActions>
                <Delete 
                    fontSize="small" 
                    style={{ marginLeft: 'auto' }} 
                    onClick={() => removeNote(note)}
                />
                <Restore 
                    fontSize="small"
                    onClick={() => restoreNote(note)}
                />
            </CardActions>
        </StyledCard>
    );
};

export default DeleteNote;
