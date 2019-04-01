import React from 'react';

import H1 from '../H1';
import Polls from '../Polls';
import GreetingPage from './GreetingPage';

import './AppBody.scss';

// type Props = {
//   selectedFlow: string | undefined;
// };

// const AppBody = ({ selectedFlow }: Props) => {
//   const contentView =
//     selectedFlow !== undefined ? (
//       <>
//         <H1>{selectedFlow}</H1>
//         <Polls selectedFlow={selectedFlow} />
//       </>
//     ) : (
//       <GreetingPage />
//     );

//   return <div className="app-body">{contentView}</div>;
// };

const AppBody: React.FunctionComponent = ({ children }) => {
  return <div className="app-body">{children}</div>;
};

export default AppBody;

// return (
//   <div className="app-body">
//     <Route exact path="/" component={GreetingPage} />
//     <Route
//       path="/polls/:flow"
//       render={() => {
//         return (
//           <>
//             <H1>{selectedFlow}</H1>
//             <Polls selectedFlow={selectedFlow} />
//           </>
//         );
//       }}
//     />
//   </div>
// );
