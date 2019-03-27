import axios, { CancelTokenSource } from 'axios';
import { useState, useContext, useEffect } from 'react';

import { UserdataContext } from '../../../contexts';
import { yonFetch, yonVote, yonAdd } from '../../../services';
import { byLikeData, getVoteRateData } from '../helpers';
import { Votable, VoteFunctions, Poll } from '../../../types';

export const usePolls = (selectedFlow: string) => {
  const sortPolls = (polls: Polls) => polls.sort(byLikeData);

  const fetchPolls = () => {
    // axios token for cancelling requests
    let token: CancelTokenSource | undefined;
    if (token) {
      token.cancel();
    }
    token = axios.CancelToken.source();

    setLoading(true);

    yonFetch
      .getPollsByFlow(selectedFlow, { cancelToken: token.token })
      .then((newPolls) => {
        setLoading(false);
        setPolls(sortPolls(newPolls));
      })
      .catch((reason) => {
        setLoading(false);
        if (!axios.isCancel(reason)) {
          setError(
            `An error occured! Please, refresh this page. Reason: ${reason}`
          );
        }
      });
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
      ? yonAdd.addPoll(selectedFlow, statement).then(() => fetchPolls())
      : Promise.reject('Such poll already exists!');
  };

  const { userdata, updateProfile } = useContext(UserdataContext);

  const [polls, setPolls] = useState([] as Polls);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as string | null);

  // Fetch and sort polls on initial loadup / flow change
  useEffect(() => {
    fetchPolls();
  }, [selectedFlow]);

  return {
    pollData: createPollData(),
    addPoll,
    loading,
    error,
  };
};

type Polls = Poll[];
