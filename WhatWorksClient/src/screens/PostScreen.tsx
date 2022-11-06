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
    heading: "Cape Cod Chips", user:"Jane Doe",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageLink: "https://www.capecodchips.com/wp-content/uploads/2020/05/sea-salt_vinegar-1.jpg"
  });

  // DB Routes
  //> userCreatedReviews
  //> DummyReviews

  const fetchReview = () => {
    const dbReviewRoute = ref(db, 'DummyReviews/');
    get( child(dbReviewRoute, `${review}/`) ).then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val());

      let reviewData = snapshot.val();

      setData(
        {
          heading: reviewData.title, 
          user: reviewData.username,
          description: reviewData.review,
          imageLink: reviewData.imageURL
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
      heading = {data.heading}
      user = {data.user}
      description = {data.description}
      imageLink = {data.imageLink}
      link={undefined}
      navigation={navigation}
    />
  );
}