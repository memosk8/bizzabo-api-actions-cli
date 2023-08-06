/**
 * 
 * @description
 * Timer helper to wait in the terminal
 * 
 * @param {Number} ms
 * milliseconds 
 */

const sleep = ms => new Promise(res => setTimeout(res, ms));

export default sleep;