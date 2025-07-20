const allowedOrigins = [
  "http://localhost:5173",  
  "http://localhost:5000",
  "https://agri-guard-9x4f.vercel.app"   
];

module.exports = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
