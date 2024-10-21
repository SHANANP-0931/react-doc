import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import {
    Button, Grid, Card, CardContent, Typography, Box,
    TextField, Stack, IconButton
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [documents, setDocuments] = useState([]);
    const [docName, setDocName] = useState(""); // State for new document name
    const navigate = useNavigate();

    // Fetch existing documents from Firestore on component mount
    useEffect(() => {
        const fetchDocs = async () => {
            const querySnapshot = await getDocs(collection(db, "documents"));
            setDocuments(
                querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };
        fetchDocs();
    }, []);

    // Function to create a new document in Firestore and update the state
    const createNewDoc = async () => {
        if (!docName) {
            alert("Document name is required!");
            return;
        }
        const docRef = await addDoc(collection(db, "documents"), {
            name: docName,
            content: "",
            createdAt: new Date().toISOString()
        });
        setDocuments([...documents, { id: docRef.id, name: docName }]);
        setDocName(""); // Clear input field after saving
    };

    // Function to delete a document from Firestore and update the state
    const deleteDocById = async (id) => {
        await deleteDoc(doc(db, "documents", id));
        setDocuments(documents.filter((doc) => doc.id !== id)); // Update state
    };

    return (
        <Box
            sx={{
                padding: 5,
                minHeight: "100vh",
                backgroundColor: "#f4f4f4",
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                Your Documents
            </Typography>

            {/* Input and Save button to create new documents */}
            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <TextField
                    label="Document Name"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#1976d2",
                        "&:hover": { backgroundColor: "#1565c0" },
                    }}
                    onClick={createNewDoc}
                >
                    Save Document
                </Button>
            </Stack>

            {/* Display documents in a responsive grid layout */}
            <Grid container spacing={3}>
                {documents.map((doc) => (
                    <Grid item xs={12} sm={6} md={4} key={doc.id}>
                        <Card
                            sx={{
                                position: "relative",
                                cursor: "pointer",
                                transition: "transform 0.3s",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            <CardContent onClick={() => navigate(`/editor/${doc.id}`)}>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    {doc.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Created: {new Date(doc.createdAt).toLocaleDateString()}
                                </Typography>
                            </CardContent>

                            {/* Delete Button */}
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8
                                }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent navigating to editor
                                    deleteDocById(doc.id);
                                }}
                            >
                                <DeleteIcon color="error" />
                            </IconButton>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
