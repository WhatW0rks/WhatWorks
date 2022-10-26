import { createContext } from "react";

const ReviewContext = createContext({
    review: 0,
    setReview: (v) => {}
});


export default ReviewContext;