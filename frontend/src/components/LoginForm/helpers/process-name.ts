import { Process } from '../process.type';

export const getProcessName = (process: Process) =>
  process === 'signin'
    ? 'Sign in'
    : process === 'signup'
    ? 'Sign Up'
    : 'Reset Password';
