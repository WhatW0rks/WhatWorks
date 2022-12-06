import React, { useState, useEffect } from 'react';
import UserProductReviewPage from '../components/UserProductReviewPage';

// Firebase
import { database } from '../firebase';
import { child, get, ref } from "firebase/database";

// Firebase DB
const db = database;

// React Contexts
import ReviewContext from '../reviewSelectorContext'

export default function PostScreen({navigation}) {
  const {setReview, review} = React.useContext(ReviewContext);

  // Default Data
  const [data, setData] = useState({
    heading: "Loading...", 
    user:"Loading...",
    description: "Loading...",
    imageLink: "https://upload.wikimedia.org/wikipedia/commons/4/41/Image_tagging_icon_03.svg",
    tags: "Loading..."
  });

  const fetchReview = () => {
    const dbReviewRoute = ref(db, 'Reviews/');
    get( child(dbReviewRoute, `${review}/`) ).then((snapshot) => {
    if (snapshot.exists()) {
      let reviewData = snapshot.val();

      setData(
        {
          heading: reviewData.title, 
          user: reviewData.username,
          description: reviewData.review,
          imageLink: reviewData.imageURL,
          tags: reviewData.tags
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
      statistics = {[["Overall Rating", "5", "Sugar", "500mg"], 
                     ["Calories", "180 cal","Fat", "20mg"], 
                     ["Sodium", "200mg","",""]]}
    />
  );
}