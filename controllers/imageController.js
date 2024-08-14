// image upload
const multer = require('multer');
const path = require('path');
//const db = require('../config/dbConfig1');

// Image upload controller
const addImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }

        const imagePath = req.file.path; // Get the path of the uploaded image

        // Insert a new row into the 'images' table with the image path
        const insertQuery = `INSERT INTO images (image) VALUES (?)`;
        const [result] = await db.execute(insertQuery, [imagePath]);

        if (result.affectedRows === 0) {
            return res.status(500).json({ message: 'Failed to insert image path' });
        }

        res.status(201).json({ message: 'Image path inserted successfully' });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Server error while inserting image path' });
    }
};

// upload image controller
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../Images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: '5000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimType && extname) {
            return cb(null, true);
        }
        cb('Give proper file format to upload');
    }
});

// export
module.exports = { upload, addImage };
