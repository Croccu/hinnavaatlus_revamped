import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ForumHome } from "./components/ForumHome";
import { CategoryView } from "./components/CategoryView";
import { ThreadView } from "./components/ThreadView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: ForumHome },
      { path: "category/:categoryId", Component: CategoryView },
      { path: "thread/:threadId", Component: ThreadView },
    ],
  },
]);
