const puppeteer = require('puppeteer');



const baseURL = 'https://instagram.com/';
const tagURL = (tag) => 'https://instagram.com/explore/tags/'+tag+'/';


function randomize(min, max){
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.random() * (max+min)+min;
}

const   instagram ={
    browser: null,
    page: null,


    init: async () => {
        instagram.browser = await puppeteer.launch({
            headless: false
        });

    instagram.page= await instagram.browser.newPage();

  
    
    },
    login: async (username, password) =>{

        await instagram.page.goto(baseURL, {waitUntil: 'networkidle2'});
   
        let loginButt = await instagram.page.$x('//a[contains(text(), "Log in")]');
        
        await instagram.page.waitFor(8000);

        /* Click on the login buton to move to login vs signup  */
        await loginButt[0].click();

        await instagram.page.waitForNavigation({waitUntil: 'networkidle2'});

        await instagram.page.waitFor(1000);

        /*Writing user and password like a human */
        await instagram.page.type('input[name="username"]', username, { delay: 50 });
        await instagram.page.type('input[name="password"]', password, { delay: 50 });

        /*Clicking on the login button to login to Instagram */
        await instagram.page.waitFor(60);
        await instagram.page.keyboard.press('Enter');
        
        //Verifying that we are in the right place and waiting to fool the Zuck
        await instagram.page.waitFor(5000);
        await instagram.page.waitFor('a > span[aria-label="Profile"]');



    },

    liker9000: async(tags = []) => { 

        //How many loops do you want?
        let howManyLoops = 100;


        for(let i = 0; i < howManyLoops/10; i++){
        //Adding an additional pause
        for(let i = 0; i < 10; i++){

        for(let tag of tags)    {
            
            //Time between posts
            let randoTime = randomize(1750, 3000);
            //Amount of posts liked
            let randoPosts = randomize(2.1,4);
            //Time between Tags
            let randoTagSwitch = randomize(20000, 45000)
            
            
            console.log('Tag:'+tag);
            console.log('Post Timer:'+randoPosts);
            console.log('Tag Timer:'+randoTagSwitch);
            console.log('Wait Timer:'+randoTime);



            //Its hashtag time, This takes you to the specific hashtag part of Instagram
        await instagram.page.waitFor(2000)
        //let notNowButton = await instagram.page.$('//a[contains(text(), "Not Now")]');
        await instagram.page.goto(tagURL(tag), {waitUntil: 'networkidle2'});
        // await notNowButton[0].click;
        // await instagram.page.waitFor(5000);
        // await instagram.page.type('input[placeholder="Search"]', tag, { delay: 50 });
        // await instagram.page.waitFor(1000);

        let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');

        for(let i = 0; i < randoPosts; i++){
            let post = posts[i]
            //Click on the post
            await instagram.page.waitFor(1000);
            await post.click();
            
            //Wait on post to load
            await instagram.page.waitFor('span[id="react-root"][aria-hidden="true"]');
            await instagram.page.waitFor(1000);

            let canLike = await instagram.page.$('span[aria-label="Like"]');

            if(canLike){
                await instagram.page.click('span[aria-label="Like"]');

            }

            await instagram.page.waitFor(3000);

            await instagram.page.keyboard.press('Escape');
            await instagram.page.waitFor(1000);

            }

            await instagram.page.waitFor(randoTagSwitch);
        
        
        }
    }       
    await instagram.page.waitFor(30000);
}
}
}
module.exports = instagram;