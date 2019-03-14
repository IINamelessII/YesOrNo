export type VoteFunctions = {
  voteYes: () => Promise<any> | void;
  voteNo: () => Promise<any> | void;
  rateLike: () => Promise<any> | void;
  rateDislike: () => Promise<any> | void;
};
