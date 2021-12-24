const { Model } = require('sequelize');
const redis = require('../../services/redis');
const { getModuleLogger } = require('../../services/logService');

const logger = getModuleLogger(module);
logger.debug('MODEL CREATED');

const DATA_KEY = 'services';

module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}

    /**
     * 1. читаєм дані з БД
     * 2. перетворю array у map { service_prefix: service_data }
     * 3. робимо спробу записати в redis і відразу повертаємо дані
     * 4. якщо помилка при виконанні операції this.redis.set() => Unhandled rejection at promise
    */
    static readDb() {
      let services;
      return Services
        .findAll()
        .then((result) => result.map((item) => item.get({ plain: true })))
        .then((result) => result.reduce((r, service) => {
          Object.assign(r, { [service.prefix]: service });
          return r;
        }, {}))
        .then(async (data) => {
          services = data;
          if (this.redis?.status === 'ready') {
            this.redis.set(DATA_KEY, JSON.stringify(services));
          }
          return services;
        });
    }

    /**
     * 1. якщо redis не ініціалізований, то виконуємо ініт +
     *    читаємо дані з БД і сетимо прочитані дані в redis
     * 2. якщо redis ініціалізований але відсутнє підключеня, то читаємо дані з БД
     * 3. якщо redis підключений, то читаємо дані з redis
     * 4. У випадку помилки або відсутності даних читаємо з БД
    */
    static readCacheOrDb() {
      if (!this.redis) {
        this.redis = redis.init();
        return Services.readDb();
      }

      if (this.redis.status !== 'ready') return Services.readDb();

      return this.redis
        .get(DATA_KEY)
        .then((services) => {
          if (!services) throw new Error('Bad data key or value');
          return JSON.parse(services);
        })
        .catch((e) => {
          logger.error(e);
          return Services.readDb();
        });
    }
  }

  Services.init({
    name: {
      type: DataTypes.STRING,
    },
    prefix: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'services',
  });

  return Services;
};
