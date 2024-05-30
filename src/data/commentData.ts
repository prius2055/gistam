export type Comment = {
  user_id: number | null;
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

export interface CommentDeleteData {
  userId: number | null;
  postId: number;
  commentId: number | null;
}
