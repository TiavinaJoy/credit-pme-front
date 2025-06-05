import React from 'react';
import {
    TextField,
    Button,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    Typography,
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
    CircularProgress,

} from '@mui/material';
import { useApi } from '../../hooks/useApi';
import { forEach } from 'lodash-es';
import { useNavigate } from 'react-router';

// Schéma de validation avec Yup

// sizing
function createRecipeRow(id, name, mealType, prepTime, cookTime, cuisine, difficulty) {
    return { id, name, mealType, prepTime, cookTime, cuisine, difficulty };
}


const RecipeList = () => {
    const { data, isLoading, error } = useApi('https://dummyjson.com/recipes');
    const navigate = useNavigate();
    const rows = [];
    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh" // occupe toute la hauteur de l'écran
            >
                <CircularProgress />
            </Box>
        );
    }
    if (error) return <Typography color="error">Erreur de chargement</Typography>;
    if (!data?.recipes) return <Typography>Aucune recette trouvée.</Typography>;
    data.recipes.forEach(recipe => {
        rows.push(createRecipeRow(recipe.id, recipe.name, recipe.mealType, recipe.prepTimeMinutes, recipe.cookTimeMinutes, recipe.cuisine, recipe.difficulty))
    });
    const rowClick = (id) => {
        navigate(`/recipes/${id}`);
    }
    return (
        <TableContainer>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Temps requis (minutes)</TableCell>
                        <TableCell>Cuisine</TableCell>
                        <TableCell>Difficulté</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row) => (
                            <TableRow key={row.id} onClick={() => rowClick(row.id)} >
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.mealType}</TableCell>
                                <TableCell>Prep: {row.prepTime}+ cooking: {row.cookTime}</TableCell>
                                <TableCell>{row.cuisine}</TableCell>
                                <TableCell>{row.difficulty}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RecipeList;
