// Tag Selector Service (TEMPORARY)
import React from "react";

const TagContext = React.createContext({
    tag: "",
    setTag: (v) => {}
});

export default TagContext 