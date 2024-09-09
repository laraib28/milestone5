const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.username}.pdf`);
    }
});
const upload = multer({ storage });
