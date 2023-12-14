const User = require('../models/User')
const Skills = require('../models/Skills')

module.exports = {
    updateUser: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.user.id,
                {$set: req.body}, {new: true}
                );
                res.status(200).json({status: true})
        } catch (error) {
            res.status(500).json({error: error});            
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json({status: true});
        } catch (error) {
            res.status(500).json({error: error});                        
        }
    },

    getUser: async (req, res) => {
        try {
            const profile = await User.findById(req.user.id);

            const {password, createdAt, updatedAt, __v, ...userData} = profile._doc;

            res.status(200).json(userData)
        } catch (error) {
            res.status(500).json({error: error});                 
        }
    },

    addSkills: async (req, res) => {
        const newSkill = new Skills({userId: req.user.id, skill: req.body.skill});
        try {
            await newSkill.save();

            await User.findByIdAndUpdate(req.user.id, {$set: {skills: true}})
            res.status(200).json({status: true})
        } catch (error) {
            res.status(500).json({error: error});                 
        }
    },
    getSkills: async (req, res) => {
        const userId = req.user.id;

        try {
            const skills = await Skills.find({userId: userId}, {createdAt: 0, updatedAt: 0, __v: 0});
            if (skills.length === 0) {
                return res.status(200).json([])
            }
            res.status(200).json({skills});
        } catch (error) {
            res.status(500).json({error: error});                             
        }

    },

    deleteSkill: async (req, res) => {
        const id = req.params.id;

        try {
            await Skills.findByIdAndDelete(id)
            res.status(200).json({status: true})
        } catch (error) {
            res.status(500).json({error: error});                             
        }
    }
}