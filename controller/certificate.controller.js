const CertificateModel = require("../model/certificate.model");
const CertificateService = require("../service/certificateService.service")
const certificateService = new CertificateService(CertificateModel)

async function certificateDetails(req, res) {
    try {
        const {
            message,
            data
        } = await certificateService.createCertificates(req)
        return res.status(201).json({
            data,
            message
        })
    } catch (error) {
        return res.status(400).json({
            message: "Certificate Creation Error.",
            error: error.message
        })
    }
}

async function getAllCertificates(req, res) {
    // console.log(req.user)
    try {
        const {
            data,
            message
        } = await certificateService.getCertificateDetails()
        return res.status(200).json({
            message,
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: "Certificates not found",
            error: error.message
        })
    }
}


async function getCertificateById(req, res) {
    try {
        const {
            data,
            message
        } = await certificateService.getCertificateById(req);
        return res.status(200).json({
            message,
            data
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

async function updateCertificateDetails(req, res) {
    try {
        const {
            data,
            message
        } = await certificateService.updateCertificateDetails(req)
        return res.status(200).json({
            message,
            data
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

async function deleteCetificate(req, res) {
    try {
        const {
            message
        } = await certificateService.deleteCertificate(req);
        return res.status(200).json({
            message: message
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    certificateDetails,
    getAllCertificates,
    getCertificateById,
    updateCertificateDetails,
    deleteCetificate
};