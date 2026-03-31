import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ForumHome } from "./components/ForumHome";
import { CategoryView } from "./components/CategoryView";
import { ThreadView } from "./components/ThreadView";
import { AuthPage } from "./components/AuthPage";
import { InfoPage } from "./components/InfoPage";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: ForumHome },
      { path: "category/:categoryId", Component: CategoryView },
      { path: "thread/:threadId", Component: ThreadView },
      { path: "auth", Component: AuthPage },
      { path: "page/:slug", Component: InfoPage },
    ],
  },
]);
