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
import { width } from '@mui/system';

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
    image_CIN_recto: Yup.mixed()
        .required('Une image est requise')
        .test('fileFormat', 'Format d’image non valide', (value) => {
            return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }),
    image_CIN_verso: Yup.mixed()
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
                image_CIN_recto: null,
                image_CIN_verso: null,
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

                    <Grid container spacing={1} paddingTop={1}>
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
                    </Grid>
                    <Grid container spacing={1} paddingTop={1}>
                        <Grid item sx={semiLage}>
                            <TextField
                                fullWidth
                                name="montant"
                                label="Montant demandé (Ariary)"
                                value={values.montant}
                                onChange={handleChange}
                                error={touched.montant && Boolean(errors.montant)}
                                helperText={touched.montant && errors.montant}
                                type="number"
                            />
                        </Grid>
                        <Grid item sx={semiLage}>
                            <TextField
                                fullWidth
                                name="duree"
                                label="Maturité du crédit"
                                value={values.duree}
                                onChange={handleChange}
                                error={touched.duree && Boolean(errors.duree)}
                                helperText={touched.duree && errors.duree}
                                type="number"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} paddingTop={1}>
                        <Grid item width={'100%'}> 
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
                        </Grid>

                    </Grid>
                    {/* Motif */}


                    {/* Champ Image */}
                    <Grid container gap={1}>
                        <Grid xs='40'>
                            <Typography variant="subtitle1">Image du CIN Recto (JPEG/PNG)</Typography>
                            <input
                                name="image_CIN_recto"
                                type="file"
                                accept="image/jpeg,image/png"
                                onChange={(event) => {
                                    setFieldValue('image', event.currentTarget.files[0]);
                                }}
                            />
                            {touched.image_CIN_recto && errors.image_CIN_recto && (
                                <FormHelperText error>{errors.image_CIN_recto}</FormHelperText>
                            )}
                        </Grid>
                        <Grid xs='40'>
                            <Typography variant="subtitle1">Image du CIN Verso (JPEG/PNG)</Typography>
                            <input
                                name="image_CIN_verso"
                                type="file"
                                accept="image/jpeg,image/png"
                                onChange={(event) => {
                                    setFieldValue('image', event.currentTarget.files[0]);
                                }}
                            />
                            {touched.image_CIN_verso && errors.image_CIN_verso && (
                                <FormHelperText error>{errors.image_CIN_verso}</FormHelperText>
                            )}
                        </Grid>
                        <Grid xs='40px'>
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
                        </Grid>
                    </Grid>
                    {/* Bouton */}
                    <Button type="submit" variant="contained" color="primary" sx={{
                        width: {
                            xs: '500%',   // pour < 600px
                            sm: '45%',    // pour ≥ 600px
                            md: '45%',    // pour ≥ 900px
                        }
                    }}>
                        Envoyer la demande
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default FormulaireDemande;
