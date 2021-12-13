module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('services', [
      {
        name: 'user-service',
        prefix: 'users',
        url: 'http://localhost:3001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'video-service',
        prefix: 'videos',
        url: 'http://localhost:3002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'history-service',
        prefix: 'history',
        url: 'http://localhost:3003',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'subscription-service',
        prefix: 'subscriptions',
        url: 'http://localhost:3004',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('services', null, {});
  },
};
