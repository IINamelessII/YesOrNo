import axios, { CancelTokenSource } from 'axios';
import { useState, useContext, useEffect } from 'react';

import { UserdataContext } from '../contexts';
import { yonFetch, yonVote, yonAdd } from '../services';
import { Votable, VoteFunctions, Poll, User } from '../types';

export const usePolls = (selectedFlow: string) => {
  const fetchPolls = async (soft?: boolean) => {
    // axios token for cancelling requests
    let token: CancelTokenSource | undefined;
    if (token) {
      token.cancel();
    }
    token = axios.CancelToken.source();

    soft || setLoading(true);
    setAddable(false);

    try {
      const newPolls = await (selectedFlow === 'All polls'
        ? yonFetch.getAllPolls({ cancelToken: token.token })
        : yonFetch.getPollsByFlow(selectedFlow, { cancelToken: token.token }));

      setPolls(sortPollsByLikes(newPolls));
      selectedFlow !== 'All polls' && setAddable(true);
    } catch (err) {
      setError(
        `An error occured! Please, check your connection and refresh this page. Reason: ${err}`
      );
      setPolls([]);
    } finally {
      setLoading(false);
    }
  };

  const createVoteFunctions = (pollId: number) => {
    const voteFunction = (keyword: 'vote' | 'rate', yesOrNo: Votable) => () => {
      if (userdata.is_auth) {
        const positive: 'agree' | 'likes' =
          keyword === 'vote' ? 'agree' : 'likes';
        const negative = ('dis' + positive) as 'disagree' | 'dislikes';
        const votedOrRated = (keyword + 'd') as 'voted' | 'rated';

        const [yes, no]: [Votable, Votable] =
          yesOrNo === '+' ? ['+', '-'] : ['-', '+'];
        const [pos, neg] =
          yesOrNo === '+' ? [positive, negative] : [negative, positive];

        const newPolls = polls.map((poll) => {
          if (poll.id === pollId) {
            const updatedPoll = { ...poll };

            const updatedUser = {
              ...userdata,
              [votedOrRated]: {
                '+': new Set(userdata[votedOrRated]['+']),
                '-': new Set(userdata[votedOrRated]['-']),
              },
            };

            // Performing vote logics client-side
            if (userdata[votedOrRated][yes].has(pollId)) {
              updatedUser[votedOrRated][yes].delete(pollId);
              updatedPoll[pos] -= 1;
            } else {
              if (userdata[votedOrRated][no].has(pollId)) {
                updatedUser[votedOrRated][no].delete(pollId);
                updatedPoll[neg] -= 1;
              }
              updatedUser[votedOrRated][yes].add(pollId);
              updatedPoll[pos] += 1;
            }

            // Sending data to server
            (keyword === 'vote'
              ? yesOrNo === '+'
                ? yonVote.voteYes
                : yonVote.voteNo
              : yesOrNo === '+'
              ? yonVote.rateLike
              : yonVote.rateDislike)(pollId).catch((err) => setError(err));

            // Updating client-side userdata
            updateProfile(updatedUser);
            return updatedPoll;
          }
          return poll;
        });
        setPolls(newPolls);
      }
    };

    return {
      voteYes: voteFunction('vote', '+'),
      voteNo: voteFunction('vote', '-'),
      rateLike: voteFunction('rate', '+'),
      rateDislike: voteFunction('rate', '-'),
    } as VoteFunctions;
  };

  const createPollData = () => {
    const voteRateDataOf = getVoteRateData(userdata);

    return polls.map((poll) => ({
      poll,
      voteRateData: voteRateDataOf(poll),
      voteFunctions: createVoteFunctions(poll.id),
    }));
  };

  const addPoll = (statement: string) => {
    return polls.findIndex((poll) => poll.statement === statement) === -1
      ? yonAdd
          .addPoll(selectedFlow, statement)
          .then(() => fetchPolls(true))
          .catch((err) => setError(err))
      : Promise.reject('Such poll already exists!');
  };

  const { userdata, updateProfile } = useContext(UserdataContext);

  const [polls, setPolls] = useState([] as Polls);
  const [addable, setAddable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as string | null);

  // Fetch and sort polls on initial loadup / flow change
  useEffect(() => {
    fetchPolls();
  }, [selectedFlow]);

  return {
    pollData: createPollData(),
    addPoll,
    pollsLoading: loading,
    error,
    addable,
  };
};

type Polls = Poll[];

const getVoteRateData = (userdata: User) => (
  poll: Poll
): {
  voted?: Votable;
  rated?: Votable;
} => {
  return userdata.is_auth
    ? {
        voted: (userdata.voted['+'].has(poll.id)
          ? '+'
          : userdata.voted['-'].has(poll.id)
          ? '-'
          : undefined) as Votable | undefined,
        rated: (userdata.rated['+'].has(poll.id)
          ? '+'
          : userdata.rated['-'].has(poll.id)
          ? '-'
          : undefined) as Votable | undefined,
      }
    : {};
};

const sortPollsByLikes = (polls: Poll[]): Poll[] =>
  polls.sort((prev, next) => likeRateOf(next) - likeRateOf(prev));

const likeRateOf = ({ likes, dislikes }: Poll): number => {
  return likes + dislikes >= 3 ? likes / (likes + dislikes) : Infinity;
};
