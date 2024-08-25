const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Sample data to match against
const existingData = {
    "pranshu_tyagi_15042003": {
        email: "pranshu.tyagi2021@vitstudent.ac.in",
        roll_number: "21BCE1271"
    }
};

app.post('/bfhl', (req, res) => {
    const data = req.body.data;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            "is_success": false,
            "user_id": null,
            "email": null,
            "roll_number": null,
            "numbers": [],
            "alphabets": [],
            "highest_lowercase_alphabet": []
        });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[A-Za-z]+$/.test(item));
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().reverse()[0]] : [];

    const userId = "pranshu_tyagi_15042003"; // Replace with dynamic user ID if required

    const userInfo = existingData[userId] || {
        email: "pranshu.tyagi2021@vitstudent.ac.in",
        roll_number: "21BCE1271"
    };

    res.json({
        "is_success": true,
        "user_id": userId,
        "email": userInfo.email,
        "roll_number": userInfo.roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercaseAlphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        "operation_code": 1
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});