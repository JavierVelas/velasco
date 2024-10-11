const express = require('express');
const cors = require('cors'); 


const app = express();



const authRoutes = require('./router/authRoutes');
const adminRoutes = require('./router/adminRoutes');
const gimnasiosRoutes = require('./router/gimnasiosRoutes')

const rutinaRoutes = require('./router/rutinaRoutes')



app.use(cors());
app.use(express.json());



app.use('/auth', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', gimnasiosRoutes);


app.use('/api', rutinaRoutes);




module.exports = app;
