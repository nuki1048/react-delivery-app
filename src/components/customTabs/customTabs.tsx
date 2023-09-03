import {
  Button,
  forwardRef,
  useMultiStyleConfig,
  useTab,
} from '@chakra-ui/react';

const CustomTab = forwardRef((props, ref): JSX.Element => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  // 2. Hook into the Tabs `size`, `variant`, props
  const styles = useMultiStyleConfig('Tabs', tabProps);

  return (
    <Button
      __css={styles.tab}
      {...tabProps}
      fontSize='14px'
      fontWeight='400'
      lineHeight='24px'
      borderBottom='none'
      paddingLeft='30px'
      textAlign='left'
      opacity={isSelected ? '1' : '0.5'}
    >
      {tabProps.children}
    </Button>
  );
});

export default CustomTab;
