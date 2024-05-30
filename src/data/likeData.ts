import { CommenterUserDetail } from './commentData';

export type NewLikeObj = {
  user_id: number;
  post_id: number;
};

export type LikeType = {
  id: number;
  user_id: number;
  post_id: number;
  likerDetail: CommenterUserDetail;
};
