// Review Selector Service (TEMPORARY)
import React from "react";

const ReviewContext = React.createContext({
    review: 0,
    setReview: (v) => {}
});

export default ReviewContext 