const {
    certificateDetails,
    getAllCertificates,
    getCertificateById,
    updateCertificateDetails,
    deleteCetificate
} = require("../controller/certificate.controller");
const multer = require('multer');
const {
    authenticateTo
} = require("../middleware/auth.middleware");
const router = require("express").Router();


const upload = multer({
    storage: multer.memoryStorage(), // Store file in memory, not on disk
    fileFilter: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        // Validate that the file is an Excel file (.xlsx or .xls)
        if (ext !== 'xlsx' && ext !== 'xls') {
            return cb(new Error('Only Excel files are allowed'));
        }
        cb(null, true);
    }
});



router.post('/upload-certificate', authenticateTo(["admin"]), upload.single('file'), certificateDetails);
router.get("/all-certificates", authenticateTo(["admin"]), getAllCertificates);
router.route("/:certificate_id")
    .get(authenticateTo(["admin", "user"]),getCertificateById)
    .patch(authenticateTo(["admin"]), updateCertificateDetails)
    .delete(authenticateTo(["admin"]), deleteCetificate);


module.exports = {
    certificateRouter: router
};