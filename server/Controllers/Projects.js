
const Projects = require("../models/ProjectModel");

exports.addProject = async (req, res,next) => {
    try {
        const {
        project_name,
        project_picture,
        description,
        required_investment,
        invested_amount,
        project_duration,
        showAmounts
        } = req.body;
    console.log(req.body)
        if (
        !project_name ||
        !project_picture ||
        !description ||
        !required_investment ||
        !invested_amount ||
        !project_duration
        ) {
        return res.status(406).json({
            success: false,
            message: "* Fields must be filled ",
        });
        }
    
        const project = new Projects({
        project_name,
        project_picture,
        description,
        required_investment,
        invested_amount,
        project_duration,
        showAmounts
        });
    
        await project.save();
        res.status(201).json({
        success: true,
        message: "Project added successfully",
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Internal server error",
        });
    }
    }


exports.updateProject = async (req, res, next) => {
        try {
            const {
                project_name,
                project_picture,
                description,
                required_investment,
                invested_amount,
                project_duration,
            } = req.body;
            console.log(req.body)
           

            const project = await Projects.findById(req.params.id);
            console.log(project)
            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                });
            }

            project.project_name = project_name;
            project.project_picture = project_picture;
            project.description = description;
            project.required_investment = required_investment;
            project.invested_amount = invested_amount;
            project.project_duration = project_duration;

            await project.save();

            res.status(200).json({
                success: true,
                message: "Project updated successfully",
                data: project,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    };


    exports.getAdminProjectById = async (req, res, next) => {
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
    };


    exports.deleteProject = async (req, res, next) => {
        try {
            const projectId = req.params.id;
    
            const project = await Projects.findByIdAndDelete(projectId);
    
            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                });
            }
    
            res.status(200).json({
                success: true,
                message: "Project deleted successfully",
            });
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    };
    


    exports.getAllProjects = async (req, res, next) => {
        try {
            const projects = await Projects.find();
            res.status(200).json({
                success: true,
                data: projects,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    };


    exports.addInvestment = async (req, res, next) => {
        try {
            const { id, amount,investment_status } = req.body;
            console.log(req.body)
            if (!id || !amount) {
                return res.status(406).json({
                    success: false,
                    message: "id and amount are required",
                });
            }
            const amountNumber = parseFloat(amount)
            const project = await Projects.findById(id);
    
            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                });
            }
    
            // Check if the project status is unpaid
            if (investment_status === "unpaid") {
                project.invested_amount += amountNumber;
                await project.save();
    
                res.status(200).json({
                    success: true,
                    message: "Investment added successfully",
                    data: project,
                });
            } 
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    };
    

    // exports.addInvestment = async (req, res, next) => {
    //     try {
    //         const { id, amount } = req.body;

    //         if (!id || !amount) {
    //             return res.status(406).json({
    //                 success: false,
    //                 message: "id and amount are required",
    //             });
    //         }

    //         const project = await Projects.findById(id);

    //         if (!project) {
    //             return res.status(404).json({
    //                 success: false,
    //                 message: "Project not found",
    //             });
    //         }

           
    //             project.invested_amount += amount;
    //             await project.save();

    //             res.status(200).json({
    //                 success: true,
    //                 message: "Investment added successfully",
    //                 data: project,
    //             });
           
    //     } catch (error) {
    //         res.status(500).json({
    //             success: false,
    //             message: "Internal server error",
    //         });
    //     }
    // };

