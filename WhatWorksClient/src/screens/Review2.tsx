import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import UserProductReviewPage from '../components/UserProductReviewPage';
import ReviewContext from '../reviewSelectorContext';

export default function Review2({navigation}) {

  const {setReview, review} = React.useContext(ReviewContext);
  const [data, setData] = useState({
    heading: "Cape Cod Chips", user:"Jane Doe",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageLink: "https://www.capecodchips.com/wp-content/uploads/2020/05/sea-salt_vinegar-1.jpg"
  });

  useEffect( () => {
    const fetchData = async () => {
      // console.log("LOOKING AT REVIEW DATA: ", review + 1);
      // console.log("Retrieved data from review: ", await AsyncStorage.getItem(`${review}`));
      await AsyncStorage.getItem(`${review}`).then((data) => {
        let parsedData = JSON.parse(data);
      // console.log("THE PARSED DATA: ", parsedData);
        let parsed = {
           heading: parsedData.title,
           user: "Jane Doe",
           description: parsedData.review,
           imageLink: parsedData.image
        }

        setData(parsed);
      })
    }

    fetchData();
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