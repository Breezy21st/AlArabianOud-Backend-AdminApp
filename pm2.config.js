module.exports = {
    apps: [
      {
        name: 'admin-app',
        script: 'cd /admin-app && npm start',
      },
      {
        name: 'backend',
        script: 'nodemon run dev',
        cwd: '../AlArabianOud',
      },
    ],
  };
  