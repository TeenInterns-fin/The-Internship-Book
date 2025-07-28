const app = require('./backend/server');

const PORT = process.env.PORT || 3000;

console.log('🚀 Starting The Internship Book server...');

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
        console.log(`🌐 Visit: http://localhost:${PORT}`);
        console.log(`📚 The Internship Book - Pre-order System Active`);
    });
}

module.exports = app;