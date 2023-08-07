import { Container } from '@chakra-ui/react';

import { AppContainerProps } from './AppContainer.props';
import { containerStyles } from '../../theme/styles';

function AppContainer({ children }: AppContainerProps): JSX.Element {
  return <Container {...containerStyles}>{children}</Container>;
}

export default AppContainer;
