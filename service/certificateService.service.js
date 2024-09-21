const xlsx = require('xlsx');

class CertifcateUtilsService {

    formatDateString = (dateStr) => {
        // console.log(dateStr)
        if (dateStr) {
            // Split the date string into components
            const [month, day, year] = dateStr.split('/');
            // // Format and return as DD-MM-YYYY
            const formattedDay = day.padStart(2, '0');
            const formattedMonth = month.padStart(2, '0');
            const formattedYear = year.length === 2 ? '20' + year : year; // Handle two-digit years

            // console.log(new Date(dateStr))
            // Return formatted date as DD-MM-YYYY
            // return new Date(`${formattedDay}-${formattedMonth}-${formattedYear}`);
            return new Date(dateStr);
        }
        return null; // Return null if the date string is invalid
    };


    processExcelFile = (buffer) => {
        // Read the file from the buffer
        const workbook = xlsx.read(buffer, {
            type: 'buffer'
        });

        // Get the first sheet name
        const sheetName = workbook.SheetNames[0];

        // Get the worksheet
        const worksheet = workbook.Sheets[sheetName];

        // Convert worksheet to JSON format
        const data = xlsx.utils.sheet_to_json(worksheet, {
            raw: false
        });
        // console.log(data);

        // Extract the required fields from each row
        const studentData = data.map((row) => ({
            certificateId: row['certificate_id'],
            studentName: row['student_name'],
            internshipDomain: row['internship_domain'],
            startDate: this.formatDateString(row['starting_date']),
            endDate: this.formatDateString(row['ending_date'])
        }));

        return studentData;
    };
}


class CertifcateService extends CertifcateUtilsService {
    constructor(certificateModel) {
        super();
        this.certificateModel = certificateModel;
    };

    async createCertificates(req) {
        if (!req.file) {
            throw new Error('No file uploaded')
        };

        // Process the uploaded Excel file from memory
        const studentData = this.processExcelFile(req.file.buffer);
        const studentCertificateData = await this.certificateModel.insertMany(studentData);
        // await studentCertificateData.save();

        const details = studentCertificateData.map((stdData) => {
            const {
                _id,
                certificateId,
                studentName,
                internshipDomain,
                startDate,
                endDate
            } = stdData;
            return {
                _id,
                certificateId,
                studentName,
                internshipDomain,
                startDate,
                endDate
            };
        });
        return {
            message: `${studentData.length} certificate cretaed.`,
            data: details
        };
    };


    async getCertificateDetails() {
        const certificates = await this.certificateModel.find({});
        const details = certificates.map((stdData) => {
            const {
                _id,
                certificateId,
                studentName,
                internshipDomain,
                startDate,
                endDate
            } = stdData;
            return {
                _id,
                certificateId,
                studentName,
                internshipDomain,
                startDate,
                endDate
            }
        })
        return {
            message: `${certificates.length} certificate found.`,
            data: details
        };
    };

    async getCertificateById(req) {
        const certificate = await this.certificateModel.findOne({
            certificateId: req.params.certificate_id
        });
        // console.log(certificate)

        if (!certificate) {
            throw new Error("Certificate not found.")
        };

        return {
            message: "Certificate Found.",
            data: {
                certificateId: certificate.certificateId,
                studentName: certificate.studentName,
                internshipDomain: certificate.internshipDomain,
                startDate: certificate.startDate,
                endDate: certificate.endDate
            }
        };
    };

    async updateCertificateDetails(req) {
        const certificate_id = req.params.certificate_id;
        const update_element = req.body;

        const certificate = await this.certificateModel.findById(certificate_id);

        if (!certificate) {
            throw new Error('Certificate not found');
        };

        const update_certificate = await this.certificateModel.findByIdAndUpdate(certificate_id, update_element, {
            runValidators: true,
        });

        return {
            message: "Certificate updated successfully.",
            data: update_certificate
        };
    };


    async deleteCertificate(req) {
        const certificate = await this.certificateModel.findById(req.params.certificate_id);

        if (!certificate) {
            throw new Error('Certificate not found');
        };
        await this.certificateModel.deleteOne();

        return {
            message: "Certificate Deleted"
        };
    };
};

module.exports = CertifcateService;