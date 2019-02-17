import React from 'react';

import './withCentered.scss';

interface Props {
  centered: boolean;
  children: Function;
}

interface State {
  isShown: boolean;
}

type TriggerButtonGenerator = (
  onToggleShow: Function,
  isShown: boolean
) => React.ReactElement<any, any>;

/**
 * Aims to make components able to be triggered by element generated
 * by "triggerButtonGenerator" function
 *
 * @param Wrapped React element to be centered
 * @param triggerButtonGenerator function which takes two
 * arguments: "toggleShow" function and property "isShown"
 */
const withCentered = (
  Wrapped: React.FunctionComponent | React.ComponentClass
) => (triggerButtonGenerator: TriggerButtonGenerator) =>
  class extends React.Component<Props, State> {
    state = {
      isShown: false,
    };

    onToggleShow = () => {
      this.setState(({ isShown }) => ({ isShown: !isShown }));
    };

    onClickOnBg = (e: React.MouseEvent<HTMLElement>) => {
      const target = e.target as HTMLElement;

      if (target.className === 'center-container') {
        this.setState(({ isShown }) => ({ isShown: !isShown }));
      }
    };

    render() {
      const { centered, ...wrappedProps } = this.props as Props;
      const { isShown } = this.state as State;

      const wrapped = <Wrapped {...wrappedProps} />;
      const withContainer = (
        <div className="center-container" onClick={this.onClickOnBg}>
          {wrapped}
        </div>
      );

      return (
        <React.Fragment>
          {triggerButtonGenerator(this.onToggleShow, isShown)}
          {isShown && (centered ? withContainer : wrapped)}
        </React.Fragment>
      );
    }
  };

export default withCentered;
