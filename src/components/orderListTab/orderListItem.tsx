import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Heading,
  List,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { OrderListItemProps } from './orderListItem.props';
const listItemHeading = {
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '120%',
  opacity: 0.5,
};
const listItemWrapper = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
};
const listItemText = {
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '150%',
};
const spanStyles = {
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '16px',
  opacity: '0.5',
};

const textStyles = {
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
};
const OrderListItem = ({
  credentials,
  items,
  total,
  delivery,
}: OrderListItemProps): JSX.Element => {
  const { email, name, orderNum } = credentials;
  const { subtotal, taxes, total: orderTotal } = total;
  const { country, index, region } = delivery;
  return (
    <AccordionItem border='none'>
      <AccordionButton display='flex' justifyContent='space-between'>
        <VStack as='div' textAlign='left'>
          <Box as='span' {...spanStyles}>
            Order #{orderNum}
          </Box>
          <Text {...textStyles}>Done</Text>
        </VStack>
        <VStack as='div' textAlign='left'>
          <Box as='span' {...spanStyles}>
            Order Amount
          </Box>
          <Text {...textStyles}>{orderTotal}$</Text>
        </VStack>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel padding='10px 15px'>
        <Wrap spacing='30px 180px'>
          <WrapItem {...listItemWrapper} flexDir='column'>
            <Heading {...listItemHeading}>Order information</Heading>
            <Text {...listItemText}>
              {region},{index},{country}
            </Text>
            <Text {...listItemText}>{name}</Text>
            <Text {...listItemText}>+1 (555) 123-4567</Text>
            <Text {...listItemText}>{email}</Text>
          </WrapItem>
          <WrapItem {...listItemWrapper} flexDir='column' width='270px'>
            <Heading {...listItemHeading}>
              Goods Store {/* TODO : Change to real info */}
            </Heading>
            <List width='full' display='flex' flexDir='column' gap='10px'>
              <HStack justifyContent='space-between'>
                <Text {...listItemText} opacity={0.5}>
                  Name
                </Text>
                <Text {...listItemText} opacity={0.5}>
                  Amount
                </Text>
                <Text {...listItemText} opacity={0.5}>
                  Price
                </Text>
              </HStack>
              {items.map((item) => (
                <HStack justifyContent='space-between'>
                  <Text {...listItemText}>{item.name.slice(0, 20)}...</Text>
                  <Text {...listItemText}>{item.amount}</Text>
                  <Text {...listItemText}>{item.price}$</Text>
                </HStack>
              ))}
            </List>
          </WrapItem>
          <WrapItem>
            <VStack spacing='10px' alignItems='flex-start'>
              <HStack justifyContent='space-between' w='full'>
                <Text {...listItemText} fontSize='14px' opacity={0.5}>
                  Subtotal
                </Text>
                <Text {...listItemText}>${subtotal}</Text>
              </HStack>
              <HStack justifyContent='space-between' w='full'>
                <Text {...listItemText} fontSize='14px' opacity={0.5}>
                  Sales tax (6.5%)
                </Text>
                <Text {...listItemText}>${taxes}</Text>
              </HStack>
              <HStack justifyContent='space-between' w='full'>
                <Text {...listItemText} fontSize='14px' opacity={0.5}>
                  Total due
                </Text>
                <Text {...listItemText}>${orderTotal}</Text>
              </HStack>
            </VStack>
          </WrapItem>
        </Wrap>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default OrderListItem;
