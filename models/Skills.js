const mongoose = require('mongoose');

const SkillsSchema = new mongoose.Schema({
   userId: {
       type: String, required: true,
   },
   skill: {type: String, required: true }
}, {timestamps: true})

module.exports = mongoose.model('Skill', SkillsSchema)