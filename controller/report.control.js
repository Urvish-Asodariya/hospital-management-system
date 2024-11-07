const reportschema = require("../models/report.model");
const NotificationController = require("./notification.control");
const generateReportId = require("../utils/id.util");

exports.create = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const { reportType } = req.params;
        const reportId = await generateReportId();
        const report = new reportschema({ report_id: reportId, reportType, [`${reportType}_id`]: userId, title, content });
        await report.save();
        NotificationController.sendNotification({
            userId: userId,
            message: `A new report has been created for ${reportType}.`,
            type: `${reportType}_report`
        });
        const success = {
            message: "Report created successfully",
            reportId: reportId,
            status: 200
        };
        return res.json(success);
    } catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        res.json(error);
    }
};

exports.single = async (req, res) => {
    try {
        const { reportType, reportId } = req.params;
        const report = await reportschema.findOne({ report_id: reportId, reportType });
        if (!report) {
            const error = {
                status: 404,
                message: "Report not found"
            };
            return res.json(error);
        } else {
            const success = {
                status: 200,
                report: report,
                message: "Report found"
            };
            return res.json(success);
        }
    } catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        res.json(error);
    }
};


exports.all = async (req, res) => {
    try {
        const { reportType } = req.params;
        const reports = await reportschema.find({ reportType });
        if (!reports) {
            const error = {
                status: 404,
                message: "No reports found"
            };
            return res.json(error);
        } else {
            const success = {
                status: 200,
                reports: reports,
                message: "Reports found"
            };
            return res.json(success);
        }
    } catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        res.json(error);
    }
};

exports.update = async (req, res) => {
    try {
        const { report_id } = req.params;
        const updatedReport = await reportschema.findOneAndUpdate({ report_id }, req.body, { new: true, runValidators: true })
        if (!updatedReport) {
            const error = {
                status: 404,
                message: "Report not found"
            };
            return res.json(error);
        } else {
            const success = {
                status: 200,
                report: updatedReport,
                message: "Report updated"
            };
            return res.json(success);
        }
    } catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        res.json(error);
    };
};

exports.delete = async (req, res) => {
    try {
        const report_id = req.params.report_id;
        const report = await reportschema.findByIdAndDelete(report_id);
        if (!report) {
            const error = {
                status: 404,
                message: "Report not found"
            };
            res.json(error);
        } else {
            const success = {
                status: 200,
                message: "Report deleted"
            };
            res.json(success);
        }
    }
    catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        res.json(error);
    }
};