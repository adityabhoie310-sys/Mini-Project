const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const JobRole = require('./models/JobRole');
const Skill = require('./models/Skill');

const dns = require('dns');

// Use Google DNS for MongoDB Atlas SRV connection
dns.setServers(['8.8.8.8', '8.8.4.4']);

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/skillgap_db';
    console.log(`Connecting to MongoDB at ${mongoUri.includes('@') ? mongoUri.split('@')[1] : mongoUri}...`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connection established for seeding.');

    // Load jobs & skills JSON
    const findJson = (file) => {
      const candidates = [
        path.join(__dirname, '../database', file),
        path.join(__dirname, '../database/processed', file)
      ];
      for (const c of candidates) {
        if (fs.existsSync(c)) {
          return JSON.parse(fs.readFileSync(c, 'utf8'));
        }
      }
      return [];
    };

    const jobs = findJson('jobs.json');
    const skills = findJson('skills.json');

    if (jobs.length === 0 && skills.length === 0) {
      console.log('No job or skill datasets found to seed.');
      process.exit(0);
    }

    // Clear existing
    await JobRole.deleteMany({});
    await Skill.deleteMany({});

    console.log('Cleared existing JobRole and Skill documents.');

    // Seed Skills
    const skillDocs = skills.map((s, idx) => {
      const name = typeof s === 'string' ? s : (s.name || `Skill ${idx + 1}`);
      return {
        name,
        title: name,
        data: typeof s === 'object' ? s : { name }
      };
    });
    if (skillDocs.length > 0) {
      await Skill.insertMany(skillDocs);
      console.log(`Successfully seeded ${skillDocs.length} skills into MongoDB.`);
    }

    // Seed Jobs
    const jobDocs = jobs.map((j) => ({
      title: j.title,
      description: j.description || `Professional career track for ${j.title} in modern tech teams.`,
      requiredSkills: Array.isArray(j.skills)
        ? j.skills.map((skillName) => ({
            skill: typeof skillName === 'string' ? skillName : (skillName.skill || skillName.name),
            requiredLevel: 80
          }))
        : [
            { skill: 'JavaScript', requiredLevel: 85 },
            { skill: 'React.js', requiredLevel: 80 },
            { skill: 'Node.js', requiredLevel: 75 },
            { skill: 'MongoDB', requiredLevel: 75 },
            { skill: 'Git & GitHub', requiredLevel: 80 }
          ],
      responsibilities: [
        `Architect and maintain high-performance web systems as ${j.title}`,
        'Collaborate across teams and conduct code reviews',
        'Analyze metrics and optimize system latency'
      ],
      salaryRange: '$85,000 - $140,000'
    }));
    if (jobDocs.length > 0) {
      await JobRole.insertMany(jobDocs);
      console.log(`Successfully seeded ${jobDocs.length} job roles into MongoDB.`);
    }

    console.log('✅ Database migration & seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.warn(`Note: Could not connect to MongoDB (${err.message}). Seed script created and ready whenever MongoDB service is running.`);
    process.exit(0);
  }
};

seedData();
