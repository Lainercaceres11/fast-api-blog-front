export type User = {
  id: number;
  username: string;
  email: string;
  fullname: string;
  disabled: boolean;
  role: "user" | "admin";
};

export type Blog = {
  id: number;
  title: string;
  content: string;
};
