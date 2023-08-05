/**
 * 
 * @description
 * Timer helper to wait in the terminal
 * 
 * @param {Number} ms
 * milliseconds 
 */

const timer = ms => new Promise(res => setTimeout(res, ms));

export default timer;