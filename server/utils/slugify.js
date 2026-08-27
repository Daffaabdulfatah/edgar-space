const prisma = require('../config/db');

/**
 * Convert string into URL-friendly slug
 * @param {string} text 
 * @returns {string}
 */
function cleanSlug(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')           // Replace spaces and underscores with -
    .replace(/[^\w\-]+/g, '')          // Remove all non-word chars except hyphen
    .replace(/\-\-+/g, '-')            // Replace multiple - with single -
    .replace(/^-+/, '')                // Trim - from start of text
    .replace(/-+$/, '');               // Trim - from end of text
}

/**
 * Generate a guaranteed unique slug for a Product
 * @param {string} name 
 * @param {number} [excludeId] 
 * @returns {Promise<string>}
 */
async function generateProductSlug(name, excludeId = null) {
  const baseSlug = cleanSlug(name) || 'produk';
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.product.findUnique({
      where: { slug }
    });

    if (!existing || (excludeId && existing.id === Number(excludeId))) {
      return slug;
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

/**
 * Generate a guaranteed unique slug for a Category
 * @param {string} name 
 * @param {number} [excludeId] 
 * @returns {Promise<string>}
 */
async function generateCategorySlug(name, excludeId = null) {
  const baseSlug = cleanSlug(name) || 'kategori';
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.category.findUnique({
      where: { slug }
    });

    if (!existing || (excludeId && existing.id === Number(excludeId))) {
      return slug;
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

module.exports = {
  cleanSlug,
  generateProductSlug,
  generateCategorySlug
};
