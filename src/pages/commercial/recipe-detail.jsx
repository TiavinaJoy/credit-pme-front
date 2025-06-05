import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    Chip,
    Card,
    CardMedia,
    CardContent,
    Button
} from '@mui/material';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, error } = useApi(`https://dummyjson.com/recipes/${id}`);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !data) {
        return (
            <Box p={4}>
                <Typography color="error">Erreur de chargement de la recette.</Typography>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                Retour
            </Button>

            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={data.image}
                    alt={data.name}
                />
                <CardContent>
                    <Typography variant="h4" gutterBottom>{data.name}</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {data.cuisine} | {data.difficulty} | {data.mealType?.join(', ')}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Préparation : {data.prepTimeMinutes} min | Cuisson : {data.cookTimeMinutes} min
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Calories / portion : {data.caloriesPerServing}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Note : {data.rating} ({data.reviewCount} avis)
                    </Typography>

                    <Box mt={2}>
                        <Typography variant="h6">Ingrédients</Typography>
                        <ul>
                            {data.ingredients?.map((ing, index) => (
                                <li key={index}>{ing}</li>
                            ))}
                        </ul>
                    </Box>

                    <Box mt={2}>
                        <Typography variant="h6">Instructions</Typography>
                        <ol>
                            {data.instructions?.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </Box>

                    <Box mt={2}>
                        {data.tags?.map((tag, index) => (
                            <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} />
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RecipeDetail;
