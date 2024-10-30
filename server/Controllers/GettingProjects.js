const Projects = require("../models/ProjectModel");

exports.getProjects = async (req, res,next) => {
    try {
        const allProjects = await Projects.find();
        res.status(200).json({
        success: true,
        data: allProjects,
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Internal server error",
        });
    }
    }

    exports.getProjectById = async (req, res,next) => {
        try {
            const projectId = req.params.id;
            const project = await Projects.findById(projectId);
            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                });
            }
            res.status(200).json({
                success: true,
                data: project,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }