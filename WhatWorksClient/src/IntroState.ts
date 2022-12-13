import React from "react";

const IntroContext = React.createContext({
    intro: true,
    setIntro: (v) => {}
});

export default IntroContext 