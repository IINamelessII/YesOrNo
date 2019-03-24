import { Process } from '../process.type';

export const getProcessName = (process: Process) =>
  process === 'signIn'
    ? 'Sign in'
    : process === 'register'
    ? 'Sign Up'
    : 'Reset Password';
