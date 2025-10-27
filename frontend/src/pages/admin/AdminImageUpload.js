import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';

const AdminImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [preview, setPreview] = useState('');
    const [message, setMessage] = useState('');

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    // Handle form submission
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setMessage('⚠️ Please select a file before uploading.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('description', description);

        try {
            // 👉 Replace with your actual backend upload API URL
            await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMessage('✅ Upload successful!');
            setSelectedFile(null);
            setDescription('');
            setPreview('');
        } catch (err) {
            console.error(err);
            setMessage('❌ Upload failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <StyledPaper>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Upload the Image
                        </Typography>

                        <form onSubmit={handleUpload} style={{ width: '100%' }}>
                            <InputWrapper>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ marginBottom: '16px' }}
                                />
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Upload
                                </Button>
                            </InputWrapper>
                        </form>

                        {preview && (
                            <PreviewBox>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    Preview:
                                </Typography>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                                />
                            </PreviewBox>
                        )}

                        {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}

                        <Typography sx={{ mt: 3, fontWeight: 600 }}>
                            Choose before pressing the Upload button
                        </Typography>
                    </StyledPaper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminImageUpload;

// -------------------- Styled Components --------------------
const StyledPaper = styled(Paper)`
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewBox = styled.div`
  margin-top: 20px;
  width: 100%;
`;
