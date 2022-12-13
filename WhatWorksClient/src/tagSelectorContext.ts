import React from "react";

const TagContext = React.createContext({
    tag: "",
    setTag: (v) => {}
});

export default TagContext 