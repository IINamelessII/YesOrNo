import React from 'react';

import './withCentered.scss';

export type TriggerButtonGenerator = (
  onToggleShow: (
    e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>
  ) => void,
  isShown: boolean
) => React.ReactElement<any, any>;

type Props = {
  centered?: boolean;
  /**
   * Determines whether this component should popup on render?
   */
  showAsPopup?: boolean;
};

type State = {
  isShown: boolean;
};

const getInitialState = <P extends object>({
  showAsPopup = false,
}: P & Props): State => ({
  isShown: showAsPopup,
});

/**
 * Aims to make components able to be triggered by element generated
 * by "triggerButtonGenerator" function
 *
 * @param Wrapped React element to be centered
 * @param triggerButtonGenerator function which takes two
 * arguments: "toggleShow" function and property "isShown"
 */
export const withCentered = <P extends object>(
  Wrapped: React.ComponentType<P>
) => (triggerButtonGenerator: TriggerButtonGenerator) =>
  class extends React.Component<P & Props, State> {
    state = getInitialState(this.props);

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
      const { centered = true, ...wrappedProps } = this.props;
      const { isShown } = this.state as State;

      const wrapped = (
        <Wrapped {...wrappedProps as P} onToggleShow={this.onToggleShow} />
      );
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
