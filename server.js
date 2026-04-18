const express = require('express');
const cors = require('cors');
const simulationRoutes = require('./simulationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.originalUrl}`);
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    console.log('📦 Request body:', req.body);
  }
  next();
});

app.use('/api/simulation', simulationRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Express backend is running' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Express server listening on http://localhost:${PORT}`);
});
