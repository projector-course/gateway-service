const db = require('../db/models/index');

let services = null;

async function getServicesMap() {
  if (services) return services;

  const servicesArr = await db.services.findAll()
    .then((result) => result.map(({ dataValues }) => dataValues));

  services = servicesArr.reduce((r, service) => {
    const { prefix } = service;
    Object.assign(r, { [prefix]: service });
    return r;
  }, {});

  return services;
}

module.exports = { getServicesMap };
