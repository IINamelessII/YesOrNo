import { Poll } from '../../../types';

const MIN_RATES = 3;

export const byLikeData = (prev: Poll, next: Poll): number => {
  return likeRateOf(next) - likeRateOf(prev);
};

export const likeRateOf = ({ likes, dislikes }: Poll): number => {
  return likes + dislikes >= MIN_RATES ? likes / (likes + dislikes) : Infinity;
};
