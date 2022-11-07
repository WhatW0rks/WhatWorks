export const getComments = () => {
    return [
      {
        id: "1",
        body: "First comment",
        username: "Jack",
        userId: "1",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
        uri:"https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg"
      },
      {
        id: "2",
        body: "Second comment",
        username: "John",
        userId: "2",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
        uri:"https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg"
      },
      {
        id: "3",
        body: "First comment first child",
        username: "John",
        userId: "2",
        parentId: "1",
        createdAt: "2021-08-16T23:00:33.010+02:00",
        uri:"https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg"
      },
      {
        id: "4",
        body: "Second comment second child",
        username: "John",
        userId: "2",
        parentId: "2",
        createdAt: "2021-08-16T23:00:33.010+02:00",
        uri:"https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg"
      },
    ];
  };
  
  export const createComment =  (text:string, parentId = null) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: "1",
      username: "John",
      createdAt: new Date().toISOString(),
      uri:"https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg"
      
    };
  };
  
  export const updateComment = async (text) => {
    return { text };
  };
  
  export const deleteComment = async () => {
    return {};
  };
  