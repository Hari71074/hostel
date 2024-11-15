const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cron = require('node-cron');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost/luckyboys', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Schema for Student and Job Seeker
const StudentSchema = new mongoose.Schema({
    name: String,
    studentId: String,
    mobile: String,
    nativePlace: String,
    fatherMobile: String,
    registrationDate: { type: Date, default: Date.now }
});

const JobSeekerSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    nativePlace: String,
    registrationDate: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', StudentSchema);
const JobSeeker = mongoose.model('JobSeeker', JobSeekerSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Register User Endpoint
app.post('/register', (req, res) => {
    const data = req.body;

    let newUser;

    if (data.type === 'student') {
        newUser = new Student(data);
    } else {
        newUser = new JobSeeker(data);
    }

    newUser.save()
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            res.json({ success: false });
            console.error(err);
        });
});

// Send SMS Reminder (using Twilio)
function sendSmsReminder(mobile, name) {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    client.messages.create({
        to: mobile,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: `Hello ${name}, your monthly hostel fee is due. Please make the payment soon.`
    })
    .then(message => console.log(`Reminder sent to ${name} (${mobile}): ${message.sid}`))
    .catch(err => console.error('Error sending SMS:', err));
}

// Cron job for sending reminders once a month
cron.schedule('0 9 1 * *', async () => {  // Runs at 9:00 AM on the 1st of every month
    console.log('Sending monthly reminders...');
    
    // Send reminders for students
    const students = await Student.find();
    students.forEach(student => {
        sendSmsReminder(student.mobile, student.name);
    });

    // Send reminders for job seekers
    const jobSeekers = await JobSeeker.find();
    jobSeekers.forEach(jobSeeker => {
        sendSmsReminder(jobSeeker.mobile, jobSeeker.name);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
