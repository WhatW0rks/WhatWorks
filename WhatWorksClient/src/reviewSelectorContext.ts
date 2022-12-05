// Review Selector Service (TEMPORARY)
import React from "react";
import Dispatch from "react";

const ReviewContext = React.createContext({
    review: 0,
    setReview: (v) => {},
    link: '', 
    setLink:  (v) => {},
});

export default ReviewContext 