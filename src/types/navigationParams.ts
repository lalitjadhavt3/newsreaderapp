import { NewsItem } from "../screens/NewsFeed";

// Define the param types for the stack navigation
export type RootStackParamList = {
    NewsFeed: undefined;
    NewsDetail: { item: NewsItem }; 
    param:undefined;
    Bookmarks:undefined
  };
  