module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('services', [
      {
        name: 'user-service',
        prefix: 'users',
        url: 'http://localhost:3001',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InByZWZpeCI6Ii91c2VycyJ9LCJpYXQiOjE2Mzk2OTAxMTQsImV4cCI6MTYzOTc3NjUxNH0.r4KevceakSwaEM1ucQA_QJqWUJ051YXJFchNi0tPq4I',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'video-service',
        prefix: 'videos',
        url: 'http://localhost:3002',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InByZWZpeCI6Ii92aWRlb3MifSwiaWF0IjoxNjM5NjkwNTU2LCJleHAiOjE2Mzk3NzY5NTZ9.dBD_LU3i_4RNs156QC2zKwLoZdhVWG7qy82-jLmZi1w',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'history-service',
        prefix: 'history',
        url: 'http://localhost:3003',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InByZWZpeCI6Ii9oaXN0b3J5In0sImlhdCI6MTYzOTY3Mjk4NywiZXhwIjoxNjM5NzU5Mzg3fQ.DbC1xkXFtBmVYbGiJNuckg3reRd2uGxCweJxpbmDnWg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'subscription-service',
        prefix: 'subscriptions',
        url: 'http://localhost:3004',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InByZWZpeCI6Ii9zdWJzY3JpcHRpb25zIn0sImlhdCI6MTYzOTY4ODcyOCwiZXhwIjoxNjM5Nzc1MTI4fQ.d7ojR4bkbLzKWXhQehXZybu9fLiXArx4SH12C1Zvcvo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('services', null, {});
  },
};
