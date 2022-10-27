import React, { useState, useEffect } from 'react';
import UserProductReviewPage from '../components/UserProductReviewPage';

export default function PostScreen({navigation}) {

  // Default Data
  const [data, setData] = useState({
    heading: "Cape Cod Chips", user:"Jane Doe",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageLink: "https://www.capecodchips.com/wp-content/uploads/2020/05/sea-salt_vinegar-1.jpg"
  });

  useEffect( () => {
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