import pexels from 'pexels';

// Firebase 
import { database } from './firebase.js';
import { ref, set } from "firebase/database";

// Firebase DB
const db = database;

const client = pexels.createClient("563492ad6f91700001000001fb68635f9c9144ad9c5d6180f3c318aa");
const query = "Food";

function randInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateDescription = () => {
  let sampleString = `Sed ut perspiciatis unde omnis iste natus error sit 
  voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque 
  ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
  dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur 
  aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem 
  sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
  consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut 
  labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, 
  quis nostrum exercitationem ullam corporis suscipit laboriosam, 
  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure 
  reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
  vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`;

  let tokenized = sampleString.trim().split(' ').filter(word => (word != "\n" && word != ''));

  let descrArr = [];

  for (let i = 0; i < randInt(60, 80); i++) {
    let randomIndex = randInt(0, 128);
    descrArr.push(` ${tokenized[randomIndex]}`);
  }

  // Add a period
  let r = randInt(0,3);

  if (r == 0) {
    descrArr.push('.');
  } else if (r == 1) {
    descrArr.push('!');
  } else {
    descrArr.push('?');
  }

  let desc = descrArr.join(' ').trim();

  return desc.charAt(0).toUpperCase() + desc.slice(1)
}

const dataUpload = async () => {
  await client.photos.search({ query, per_page: 40, page: 5}).then(photos => {
    let data = photos.photos;

    // FOR EACH REVIEW
    for (let key in data) {
      let d = data[key];
      
      let text = generateDescription();

      // DATABASE WRITE
      set(ref(db, 'DummyIndex/' + d.id), {
        userReviewID: `${d.id}`,
        title: `${d.alt}`,
        imageURL: `${d.src.original}`
      });
      // Write the core review
      set(ref(db, 'DummyReviews/' + d.id), {
          username: `${d.photographer}`,
          title: `${d.alt}`,
          imageURL: `${d.src.original}`,
          review: `${text}`
      });
        
    }
  });
  
};

dataUpload();

console.log("Operation Complete!");


