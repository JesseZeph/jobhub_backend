const Application = require('../models/Application')

module.exports = {
    apply: async (req, res) => {
        const newApplication = new Application({
            user: req.user.id,
            job: req.body.job
        });
        try {
            await newApplication.save();
            res.status(200).json({status: true});
        }catch(error) {
            res.status(500).json({status: false, error: error.message});
        }

    },
    getApplyJobs: async(req, res) => {
        const userId = req.user.id;
        try {
            const applied = await Application.find({
                user: userId}, {__v: 0, createdAt: 0, updatedAt: 0}).sort({createdAt: -1}).populate({
                    path: 'job',
                    select: '-createdAt -updatedAt, -description -requirements -__v',
                });
                res.status(200).json(applied);
        } catch (error) {
            res.status(500).json({status: false, error: error.message});       
        }
    }
}