export type Poll = {
  id: number;
  statement: string;
  flow: string;

  agree: number;
  disagree: number;
  likes: number;
  dislikes: number;
};
