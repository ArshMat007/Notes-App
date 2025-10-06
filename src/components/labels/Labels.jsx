import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { DataContext } from '../../context/DataProvider';

const Labels = () => {
    const { labels } = useContext(DataContext);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Categories
            </Typography>
            <Grid container spacing={3}>
                {labels.map(label => (
                    <Grid item xs={12} sm={6} md={4} key={label.id}>
                        <Card component={Link} to={`/labels/${label.name}`} sx={{ textDecoration: 'none' }}>
                            <CardContent>
                                <Typography variant="h6">{label.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Labels;
