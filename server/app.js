const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const analyzeRoutes = require('./routes/analyzeRoutes');
const dockerRoutes = require('./routes/dockerRoutes');
const explainRoutes = require('./routes/explainRoutes');
const logRoutes = require('./routes/logRoutes');
const downloadRoutes = require('./routes/downloadRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/analyze', analyzeRoutes);
app.use('/api/docker', dockerRoutes);
app.use('/api/explain', explainRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/download', downloadRoutes);

app.get('/', (req, res) => {
  res.send('🛠️ Auto-Dock It Backend Running...');
});

module.exports = app;
