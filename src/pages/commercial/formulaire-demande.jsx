import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
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
    Grid,
} from '@mui/material';

// Schéma de validation avec Yup
const validationSchema = Yup.object({
    nom: Yup.string().required('Le nom est requis'),
    prenom: Yup.string().required('Le prénom est requis'),
    montant: Yup.number()
        .typeError('Veuillez entrer un nombre')
        .positive('Le montant doit être positif')
        .required('Le montant est requis'),
    duree: Yup.string().required('La durée est requise'),
    motif: Yup.string().required('Le motif est requis'),
    image: Yup.mixed()
        .required('Une image est requise')
        .test('fileFormat', 'Format d’image non valide', (value) => {
            return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }),
    document: Yup.mixed().required('Un document est requis'),
});
// sizing
const semiLage = {
    width: {
        xs: '100%',   // pour < 600px
        sm: '45%',    // pour ≥ 600px
        md: '45%',    // pour ≥ 900px
    }
}
const FormulaireDemande = () => {
    return (
        <Formik
            initialValues={{
                nom: '',
                prenom: '',
                montant: '',
                duree: '',
                motif: '',
                image: null,
                document: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                console.log('Formulaire prêt à être soumis (FormData) :', values);
                // Ici, tu pourrais envoyer `formData` via fetch ou axios
            }}
        >
            {({ values, handleChange, setFieldValue, errors, touched }) => (
                <Form>

                    <Grid container spacing={1}>
                        <Grid item sx={semiLage} >
                            <TextField
                                fullWidth
                                name="nom"
                                label="Nom"
                                value={values.nom}
                                onChange={handleChange}
                                error={touched.nom && Boolean(errors.nom)}
                                helperText={touched.nom && errors.nom}
                            />
                        </Grid>
                        <Grid item sx={semiLage}>
                            <TextField
                                fullWidth
                                name="prenom"
                                label="Prénom"
                                value={values.prenom}
                                onChange={handleChange}
                                error={touched.prenom && Boolean(errors.prenom)}
                                helperText={touched.prenom && errors.prenom}
                            />
                        </Grid>
                        <Grid item xs={semiLage}>
                            <TextField
                                fullWidth
                                name="montant"
                                label="Montant demandé (€)"
                                value={values.montant}
                                onChange={handleChange}
                                error={touched.montant && Boolean(errors.montant)}
                                helperText={touched.montant && errors.montant}
                                type="number"
                            />
                        </Grid>
                    </Grid>
                    <Box display="flex" flexDirection="column" gap={3} width="100%">

                        {/* Nom */}


                        {/* Prénom */}


                        {/* Montant */}


                        {/* Durée */}
                        <FormControl fullWidth error={touched.duree && Boolean(errors.duree)}>
                            <InputLabel>Durée</InputLabel>
                            <Select
                                name="duree"
                                value={values.duree}
                                onChange={handleChange}
                                label="Durée"
                            >
                                <MenuItem value={12}>12 mois</MenuItem>
                                <MenuItem value={24}>24 mois</MenuItem>
                                <MenuItem value={36}>36 mois</MenuItem>
                            </Select>
                            <FormHelperText>{touched.duree && errors.duree}</FormHelperText>
                        </FormControl>

                        {/* Motif */}
                        <TextField
                            fullWidth
                            name="motif"
                            label="Motif de la demande"
                            value={values.motif}
                            onChange={handleChange}
                            error={touched.motif && Boolean(errors.motif)}
                            helperText={touched.motif && errors.motif}
                            multiline
                            rows={3}
                        />

                        {/* Champ Image */}
                        <Box>
                            <Typography variant="subtitle1">Image du client (JPEG/PNG)</Typography>
                            <input
                                name="image"
                                type="file"
                                accept="image/jpeg,image/png"
                                onChange={(event) => {
                                    setFieldValue('image', event.currentTarget.files[0]);
                                }}
                            />
                            {touched.image && errors.image && (
                                <FormHelperText error>{errors.image}</FormHelperText>
                            )}
                        </Box>

                        {/* Champ Document */}
                        <Box>
                            <Typography variant="subtitle1">Autre document</Typography>
                            <input
                                name="document"
                                type="file"
                                onChange={(event) => {
                                    setFieldValue('document', event.currentTarget.files[0]);
                                }}
                            />
                            {touched.document && errors.document && (
                                <FormHelperText error>{errors.document}</FormHelperText>
                            )}
                        </Box>

                        {/* Bouton */}
                        <Button type="submit" variant="contained" color="primary">
                            Envoyer la demande
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default FormulaireDemande;
