    import { configureStore } from "@reduxjs/toolkit";

    import { postSlice } from "./reducers/posts";
    import { categoriesSlice } from "./reducers/categories";

    export default configureStore ({
        reducer :{
            post:  postSlice.reducer,
            categories:  categoriesSlice.reducer,
        }
    })