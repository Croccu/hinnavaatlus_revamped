// localStorage key constants
export const POSTS_KEY = "posts";
export const USER_KEY = "currentUser";
export const USERS_KEY = "registeredUsers";

// --- Auth helpers ---

export const getCurrentUser = (): string | null => {
  return localStorage.getItem(USER_KEY);
};

export const setCurrentUser = (username: string) => {
  localStorage.setItem(USER_KEY, username);
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const getRegisteredUsers = (): string[] => {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const registerUser = (username: string): boolean => {
  const users = getRegisteredUsers();
  if (users.includes(username)) return false;
  users.push(username);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  setCurrentUser(username);
  return true;
};

export const loginUser = (username: string): boolean => {
  const users = getRegisteredUsers();
  if (!users.includes(username)) return false;
  setCurrentUser(username);
  return true;
};

// --- Post helpers ---

export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export const getPosts = (): Post[] => {
  const raw = localStorage.getItem(POSTS_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const savePosts = (posts: Post[]) => {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

export const addPost = (title: string, content: string, author: string): Post => {
  const posts = getPosts();
  const newPost: Post = {
    id: Date.now(),
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
  };
  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
};
