// If you're using Node.js v14.17+ or any modern browser
const crypto = require('crypto');

const slugifyIT = (input) => {
  const slug = input
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '')     // Remove all non-word chars except hyphen
    .replace(/--+/g, '-')        // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '');    // Trim hyphens from start and end

  const uuid = crypto.randomUUID(); // Generate new UUID per call

  return `${slug}-${uuid}`;
};

module.exports = { slugifyIT };
