import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 10 }}
        >
            <Typography variant="h4" mb={2}>Login</Typography>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>
                Login
            </Button>
        </Box>
    );
}
