export type VoteFunctions = {
  voteYes: () => Promise<any>;
  voteNo: () => Promise<any>;
  rateLike: () => Promise<any>;
  rateDislike: () => Promise<any>;
};
