const Report = require("../models/report.model"); 
const generateReportId = async () => {
    try {
        const latestReport = await Report.findOne().sort({ report_id: -1 });
        const newReportId = latestReport ? latestReport.report_id + 1 : 1;
        return newReportId;
    } catch (error) {
        console.error("Error generating report ID:", error);
        throw new Error("Failed to generate report ID");
    }
};

module.exports = generateReportId;
