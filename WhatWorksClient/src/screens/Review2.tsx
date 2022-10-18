import * as React from 'react';
import UserProductReviewPage from '../components/UserProductReviewPage';

export default function Review2({navigation}) {
  return (
    <UserProductReviewPage
      heading ="Cape Cod Chips" 
      user ="Jane Doe"
      description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      imageLink ="https://www.capecodchips.com/wp-content/uploads/2020/05/sea-salt_vinegar-1.jpg" 
      link={undefined}
      navigation={navigation}
    />
  );
}