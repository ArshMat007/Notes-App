import { useContext } from 'react';
import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { UnarchiveOutlined as Unarchive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';
import '../notes/Note.css';

const Archive = ({ note }) => {
    const { unArchiveNote, deleteNote } = useContext(DataContext);

    return (
        <Card className="note-card">
            <CardContent>
                <Typography className="note-title">{note.heading}</Typography>
                <Typography className="note-content" dangerouslySetInnerHTML={{ __html: note.text }} />
            </CardContent>
            <CardActions>
                <IconButton
                    style={{ marginLeft: 'auto' }}
                    onClick={() => unArchiveNote(note)}
                >
                    <Unarchive fontSize="small" />
                </IconButton>
                <IconButton
                    onClick={() => deleteNote(note)}
                >
                    <Delete fontSize="small" />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Archive;