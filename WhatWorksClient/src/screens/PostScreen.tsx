import React, { useState, useEffect } from 'react';
import UserProductReviewPage from '../components/UserProductReviewPage';

// Firebase
import { database } from '../firebase';
import { child, get, ref } from "firebase/database";

// Firebase DB
const db = database;

// React Contexts
import ReviewContext from '../reviewSelectorContext'
import getLink from '../cachefunctions';

// types
import { NutritionStats } from '../components/ProductReviewForm';

export default function PostScreen({navigation}) {
  const {setReview, review} = React.useContext(ReviewContext);


  

  // Default Data
  const [data, setData] = useState({
    heading: "Loading...", 
    user:"Loading...",
    description: "Loading...",
    imageLink: "https://upload.wikimedia.org/wikipedia/commons/4/41/Image_tagging_icon_03.svg",
    tags: "Loading...", 
    nutrition: {Calories: '', Fat: '', Protein: '', Fiber: '', Sugars: '', Rating: ''}
  });

  const fetchReview =  () => {
    const dbReviewRoute = ref(db, 'Reviews/');
    get( child(dbReviewRoute, `${review}/`) ).then(async (snapshot) => {
    if (snapshot.exists()) {
      let reviewData = snapshot.val();
      const imgLink = await getLink(reviewData.imageURL)
      // const imgLink = link ? link : reviewData.imageURL;

      setData(
        {
          heading: reviewData.title, 
          user: reviewData.username,
          description: reviewData.review,
          imageLink: imgLink,
          tags: reviewData.tags, 
          nutrition: { 
            Calories: reviewData.Calories === undefined ? '' : reviewData.Calories, 
            Protein: reviewData.Protein === undefined ? '' : reviewData.Protein, 
            Fat: reviewData.Fat === undefined ? '' : reviewData.Fat,  
            Fiber: reviewData.Fiber === undefined ? '' : reviewData.Fiber, 
            Sugars: reviewData.Sugars === undefined ? '' : reviewData.Sugars,
            Rating: reviewData.Rating === undefined ? '' : reviewData.Rating,
          }
         
        }
      );

    } else {
      console.log("Review Missing!");
    }
  }).catch((error) => {
    console.error(error);
  });
  }


  useEffect( () => {
    fetchReview();
  }, []);

  return (
    <UserProductReviewPage 
      id = {review}
      heading = {data.heading}
      user = {data.user}
      description = {data.description}
      imageLink = {data.imageLink}
      tags={data.tags}
      link={undefined}
      navigation={navigation}
      statistics = {[["Overall Rating", data.nutrition.Rating, "Sugars", data.nutrition.Sugars], 
                     ["Calories", data.nutrition.Calories,"Fat", data.nutrition.Fat], 
                     ["Protein", data.nutrition.Protein,"Fiber",data.nutrition.Fiber]]}
    />
  );
}