import { createContext } from "react";

const ContextCount = createContext({
    count: 0,
    setCount: (v) => {}
});


export default ContextCount;