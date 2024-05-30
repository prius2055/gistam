import { CommentType } from './commentData';
import { LikeType } from './likeData';
import { CurrentUserDetails } from './userData';

export type NewPostObj = {
  user_id: string;
  topic: string;
  content: string;
  // author_name: string;
  post_image: FileList | string;
  // post_image: Image[] | Blob;
  // videoFile: object | string;
  // previewImageURL: string;
  // previewVideoURL: string;
};

export type PostObj = {
  id: number;
  user_id: number;
  author_name: string;
  topic: string;
  content: string;
  created_at: string;
  post_image_url: string;
  posterDetail: CurrentUserDetails;
  comments: CommentType[];
  likes: LikeType[];
  // previewImageURL: string;
  // previewVideoURL: string;
};

export interface PostFileFormData {
  user_id: number;
  author_name: string;
  topic: string;
  content: string;
  post_image: File;
}

export interface PostDeleteData {
  userId: number;
  postId: number;
}
