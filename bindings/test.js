
const addon = require('./addon');
const input = 'x';
const hash = addon.simpleHash(input);

console.log(`Input: ${input}`);
console.log(`Hash: ${hash}`);
