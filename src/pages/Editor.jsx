import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Typography, Box, Button, Stack } from "@mui/material";

export default function Editor() {
    const { id } = useParams();
    const [content, setContent] = useState("");
    const [isSaving, setIsSaving] = useState(false); // For button state
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchDoc = async () => {
            const docRef = doc(db, "documents", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setContent(docSnap.data().content);
            }
        };
        fetchDoc();
    }, [id]);

    const handleChange = (value) => {
        setContent(value); // Update content state in real-time
    };

    const handleSave = async () => {
        try {
            setIsSaving(true); // Indicate saving state
            const docRef = doc(db, "documents", id);
            await updateDoc(docRef, { content }); // Save to Firestore
            alert("Document saved successfully!");
        } catch (error) {
            console.error("Error saving document: ", error);
            alert("Failed to save the document.");
        } finally {
            setIsSaving(false); // Reset button state
        }
    };

    return (
        <Box sx={{ padding: 2, maxWidth: 800, margin: "auto" }}>
            <Typography variant="h5" mb={2}>Editing Document: {id}</Typography>

            <ReactQuill
                value={content}
                onChange={handleChange}
                theme="snow"
                style={{ marginBottom: "16px" }}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={isSaving} // Disable button during save
                >
                    {isSaving ? "Saving..." : "Save"}
                </Button>

                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/home")} // Go to Home button
                >
                    Go to Home
                </Button>
            </Stack>
        </Box>
    );
}
