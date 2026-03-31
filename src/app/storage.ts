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
  likes: string[];
  flaggedBy: string[];
};

/** Normalise posts that were saved before likes/flaggedBy existed */
const normalise = (p: Post): Post => ({
  ...p,
  likes: p.likes ?? [],
  flaggedBy: p.flaggedBy ?? [],
});

export const getPosts = (): Post[] => {
  const raw = localStorage.getItem(POSTS_KEY);
  return raw ? (JSON.parse(raw) as Post[]).map(normalise) : [];
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
    likes: [],
    flaggedBy: [],
  };
  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
};

export const toggleLike = (postId: number, username: string): Post[] => {
  const posts = getPosts();
  const post = posts.find((p) => p.id === postId);
  if (!post) return posts;
  if (post.likes.includes(username)) {
    post.likes = post.likes.filter((u) => u !== username);
  } else {
    post.likes.push(username);
  }
  savePosts(posts);
  return posts;
};

export const toggleFlag = (postId: number, username: string): Post[] => {
  const posts = getPosts();
  const post = posts.find((p) => p.id === postId);
  if (!post) return posts;
  if (post.flaggedBy.includes(username)) {
    post.flaggedBy = post.flaggedBy.filter((u) => u !== username);
  } else {
    post.flaggedBy.push(username);
  }
  savePosts(posts);
  return posts;
};
