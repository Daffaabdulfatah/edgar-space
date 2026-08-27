const prisma = require('../config/db');

/**
 * Get store settings
 */
async function getSettings() {
  let settings = await prisma.storeSetting.findUnique({
    where: { id: 1 }
  });

  if (!settings) {
    settings = await prisma.storeSetting.create({
      data: {
        id: 1,
        storeName: 'Edgar Space',
        whatsappNumber: '6281234567890',
        email: 'hello@edgarspace.com',
        address: 'Bandung, Jawa Barat, Indonesia',
        description: 'Showroom furnitur dan dekorasi rumah bergaya hangat, natural, dan modern.'
      }
    });
  }

  return settings;
}

/**
 * Update store settings
 */
async function updateSettings(data) {
  const { storeName, whatsappNumber, email, address, description } = data;

  const settings = await prisma.storeSetting.upsert({
    where: { id: 1 },
    update: {
      storeName: storeName !== undefined ? storeName : undefined,
      whatsappNumber: whatsappNumber !== undefined ? whatsappNumber : undefined,
      email: email !== undefined ? email : undefined,
      address: address !== undefined ? address : undefined,
      description: description !== undefined ? description : undefined
    },
    create: {
      id: 1,
      storeName: storeName || 'Edgar Space',
      whatsappNumber: whatsappNumber || '6281234567890',
      email: email || 'hello@edgarspace.com',
      address: address || 'Bandung, Jawa Barat, Indonesia',
      description: description || 'Showroom furnitur dan dekorasi rumah bergaya hangat, natural, dan modern.'
    }
  });

  return settings;
}

module.exports = {
  getSettings,
  updateSettings
};
