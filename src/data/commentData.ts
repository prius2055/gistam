export type Comment = {
  user_id: number;
  post_id: number;
  text: string;
};

export type CommenterUserDetail = {
  firstname: string;
  lastname: string;
  email: string;
};

export type CommentType = {
  id: number;
  user_id: number;
  post_id: number;
  text: string;
  commenterDetail: CommenterUserDetail;
  created_at: string;
};
