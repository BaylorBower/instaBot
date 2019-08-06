
const ig = require('./instagram');

(async  ()=>{

await ig.init();

/* Please dont steal this info
*  (Username,Password) 
*/

await ig.login('cowartisdope','bayb1234');

/*
 * What Instagram hashtags the bot will like separated via commas 
 */

 await ig.liker9000(['cow', 'austin', 'ATX','arts', 'mural']);

debugger;
})()