import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cron from 'node-cron';
import router from './routes';
import './config';
import Reminder from './utilities/reminder';
import { sendBookingAppointmentNotification } from './utilities/emailsender';

const PORT = process.env.PORT || 2000;
const corsOptions = {
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

const app = express();

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Routing
app.get('/', (req, res) => {
  return res.status(200).json({
    status: true,
    message: "I am alive at this port"
  })
});
app.use('/v1', router);

/* The scheduler runs every 6:00 AM */

cron.schedule('0 6 * * *', async () => {
  const send = await Reminder.sendBookingReminder();
  send[0].map((s) => {
    // send notifications
    sendBookingAppointmentNotification(s.email, `${s.firstname} ${s.lastname ? s.lastname : ''}`, s.appointmentDate)
  })
  
  console.log('running a task every minute');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
