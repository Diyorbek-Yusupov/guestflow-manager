import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const stateMap = {
  entered: 1,
  entering: 1,
  exited: 0,
  exiting: 0,
  unmounted: 0,
};

const FadeWrapper = styled.div<{
  duration: number;
  state: keyof typeof stateMap;
}>`
  ${(props) => `transition: all ${props.duration}ms ease-in-out;`}
  ${(props) => `opacity: ${stateMap[props.state]}`}
`;

interface IFadeProps {
  children: React.ReactNode;
  duration?: number;
}

const Fade = ({ children, duration = 200 }: IFadeProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <CSSTransition timeout={500} classNames="fade" unmountOnExit in={isMounted}>
      {(state) => (
        <FadeWrapper state={state} duration={duration}>
          {children}
        </FadeWrapper>
      )}
    </CSSTransition>
  );
};

export default Fade;
