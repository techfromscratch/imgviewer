const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3033;
const imagesDirectory = path.join(__dirname, 'images');

// Serve static files from the /public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/images', (req, res) => {
    fs.readdir(imagesDirectory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Server error');
            return;
        }

        // Filter only files that have an image extension
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.png', '.jpg', '.jpeg', '.gif'].includes(ext);
        });

        res.json(imageFiles);
    });
});

app.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(imagesDirectory, filename);

    // Check if file exists
    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }

        // Check the file extension to ensure it's an image
        const ext = path.extname(filepath).toLowerCase();
        if (!['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
            res.status(403).send('Forbidden');
            return;
        }

        res.sendFile(filepath);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
