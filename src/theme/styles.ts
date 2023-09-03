import {
  breackpointsAppFooterList,
  breackpointsAppFooterPadding,
  breackpointsBannerPadding,
  breackpointsBannerWidth,
  breackpointsCartFullAmountHeight,
  breackpointsGrid,
  breackpointsMainPageInput,
  breakpointsCartFullAmountFont,
  breakpointsCartItemNameFont,
  breakpointsCartPriceFont,
  breakpointsCheckoutItem,
  breakpointsFooterFlex,
  breakpointsFooterListMargin,
  breakpointsHeadingMainPage,
  breakpointsItem,
} from './breakpoints';

const containerStyles = {
  maxW: {
    base: '320px',
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1200px',
  },
  display: 'flex',
  justifyContent: 'center',
};

const restaurantsListGrid = {
  p: { base: '45px 0 20px 0 ', md: '46px 0 90px 0 ' },
  gridTemplateColumns: breackpointsGrid,
  gap: '28px 24px',
  minH: '700px',
  justifyItems: 'center',
  alignItems: 'center',
};
const restaurantItemWrapper = {
  w: breakpointsItem,
  h: '378px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  borderRadius: '7px',
  background: 'url(/pizza.jpg) top center no-repeat',
  backgroundColor: '#FFF',
  p: '268px 24px 35px 24px',
  transition: '0.5s all',
  _hover: { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)' },
};
const restaurantItemMinutesBlock = {
  w: '55px',
  h: '22px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2px',
  backgroundColor: '#000',
  color: '#FFF',
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '20px',
};

const restaurantItemRating = {
  fontWeight: '700',
  fontSize: '18px',
  lineHeight: '32px',
  color: '#FFC107',
};
const restaurantItemRatingBefore = {
  content: "'★'",
  position: 'absolute',
  right: '70%',
  transform: 'translateX(-70%)',
};
const restaurantItemFlex = {
  w: '205px',
  m: '0 auto 0 20px',
  justify: 'space-between',
  align: 'center',
};

const restaurantItemText = {
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '32px',
  color: ' #8C8C8C',
};

const restaurantPageFlex = {
  mt: '43px',
  mr: 'auto',
  w: { base: 'full', md: '443px' },
  h: '42px',
  align: 'center',
  justify: { base: 'space-evenly', md: 'space-between' },
};

const restaurantPageHeading = {
  fontWeight: '700',
  fontSize: '36px',
  lineHeight: '42px',
};

const restaurantInfoRating = {
  display: { base: 'none', md: 'block' },
  fontWeight: '700',
  fontSize: '18px',
  lineHeight: '32px',
  color: 'brand.yellow',
};

const restaurantInfoText = {
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '32px',
  color: 'brand.gray',
};
const mainPageHeading = {
  className: 'font-bold text-4xl',
  fontWeight: '700',
  fontSize: breakpointsHeadingMainPage,
  lineHeight: '42px',
};

const mainPageInput = {
  w: breackpointsMainPageInput,
  h: '40px',
  backgroundColor: '#FFF',
};

const mainPageFlex = {
  p: '50px 0 ',
  justify: 'space-between',
  align: 'center',
  width: '100%',
};

const checkoutPageWrapper = {
  minH: '670px',
  p: {
    base: '20px',
    sm: '50px',
    lg: '100px 50px ',
    xl: '103px 177px 127px 150px',
  },
};

const checkoutPageGrid = {
  gap: { base: '40px', lg: '100px', xl: '190px' },
  templateColumns: { md: '1fr', lg: '1fr 2fr' },
};

const checkoutPageFlex = {
  _hover: { transform: 'scale(1.02)' },
  transition: '0.5s all',
  w: '150px',
  align: 'center',
  justify: 'space-between',
};

const checkoutPageUl = {
  maxH: '200px',
  w: 'full',
  overflow: 'scroll',
  mt: '30px',
  ml: '0',
  spacing: '23px',
};

const checkoutPageUlTwo = {
  w: '257px',
  m: { base: '30px auto 0 auto', md: '23px 0 0 auto ' },
  listStyleType: 'none',
};

const checkoutPageListItem = {
  h: '44px',
  p: '12px 0',
  borderBottom: '1px solid rgba(60, 66, 87, 0.12)',
};

const checkoutPageTerms = {
  mt: '120px',
  display: { base: 'none', md: 'none', xl: 'flex' },
  alignContent: 'center',
};
const checkoutPagePrivacy = {
  w: '22px',
  h: '0',
  border: '1px solid #8792A2',
  transform: 'rotate(90deg)',
};

const modalLoginFormButton = {
  backgroundColor: 'brand.blue',
  color: '#fff',
  borderRadius: '2px',
};

const modalCartButtonCheckout = {
  ml: { base: '0', md: 'auto' },
  colorScheme: 'linkedin',
  borderRadius: '2px',
  lineHeight: '24px',
  fontSize: { base: '10px', md: '16px' },
};

const modalCartTextTotal = {
  w: '106px',
  h: breackpointsCartFullAmountHeight,
  borderRadius: '5px',
  p: breakpointsCartFullAmountFont,
  background: '#262626',
  color: '#FFF',
  fontWeight: '700',
  fontSize: { base: '15px', md: '20px' },
  lineHeight: '23px',
};
const modalCartButtonCancel = {
  ml: { base: 0, md: '18px' },
  borderRadius: '2px',
  variant: 'outline',
};

const modalCartList = {
  spacing: 4,
  w: { base: 'full', md: '680px' },
  listStyleType: 'none',
};
const menuListLink = {
  display: 'block',
  margin: '0 auto',
  textAlign: 'center',
  textDecoration: 'underline',
};

const menuListGrid = {
  minH: '800px',
  p: '46px 0 90px 0 ',
  templateColumns: breackpointsGrid,
  templateRows: '418px',
  gap: '30px 24px',
  justifyItems: 'center',
};
const checkoutItemListItem = {
  w: breakpointsCheckoutItem,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const checkoutFormApplePayButton = {
  backgroundColor: '#000',
  boxShadow:
    ' 0px -1px 1px rgba(0, 0, 0, 0.12), 0px 2px 5px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.08)',
  h: '48px',
  w: 'full',
  _hover: { backgroundColor: 'rgba(0,0,0,.6)' },
};

const checkoutFormGridItem = {
  w: { base: 'full', md: '421px' },
  h: 'full',
  justifySelf: 'center',
};

const checkoutFormBefore = {
  content: '""',
  position: 'absolute',
  left: '-5px',

  top: '50%',
  width: { base: '55px', md: '125px' },
  height: '1px',
  backgroundColor: 'rgba(60, 66, 87,.12)',
};
const checkoutFormAfter = {
  content: '""',
  position: 'absolute',
  right: '-5px',

  top: '50%',
  width: { base: '55px', md: '125px' },
  height: '1px',
  backgroundColor: 'rgba(60, 66, 87,.12)',
};
const checkoutFormChoiceStyle = {
  mt: '32px',

  color: ' #8792A2',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '24px',
};
const checkoutFormSelect = {
  borderRadius: '8px 8px 0px 0px',
  placeholder: 'Select an area',
  variant: 'outline',
};
const checkoutFormInput = {
  w: { base: 'full', md: '421px' },
  borderRadius: ' 0px 0px 8px 8px',
  color: '#697386',
  placeholder: 'Index',
};

const checkoutFormButtonSubmit = {
  h: '48px',
  background: 'brand.blue',
  color: ' #FFF',
  w: 'full',
  _hover: { background: 'rgba(24, 144, 255,.5)' },
};

const cartItemListItem = {
  p: '8px 0 8px 0',
  borderBottom: '1px solid #D9D9D9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const cartItemTextPositionName = {
  fontWeight: '400',
  fontSize: breakpointsCartItemNameFont,
  lineHeight: '32px',
};
const cartItemTextPrice = {
  mr: 'auto',
  fontWeight: '700',
  fontSize: breakpointsCartPriceFont,
  lineHeight: '32px',
};

const cartItemButton = {
  colorScheme: 'linkedin',
  variant: 'outline',
};

const cartItemFlexControls = {
  w: '215px',
  justify: 'space-between',
  align: 'center',
};

const cartItemImage = {
  borderRadius: '8px',
  width: '64px',
  height: '35px',
};

const logoWrapper = {
  display: 'flex',
  w: '100px',
  transition: '0.8s all',
  _hover: { transform: 'scale(1.02)' },
};

const logoText = {
  fontWeight: '400',
  fontSize: '15px',
  lineHeight: '18px',
};

const appHeaderWrapper = {
  alignItems: 'center',
  justify: 'space-between',
  w: '1200px',
  h: '40px',
  mt: '44px',
};

const appHeaderInputGroup = {
  w: {
    base: '120px',
    sm: '120px',
    md: '250px',
    lg: '400px',
    xl: '640px',
  },
  display: { base: 'none', sm: 'block' },
};

const appHeaderInput = {
  filter: ' drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));',
  borderRadius: '2px',
  placeholder: 'Shipping address',
};
const appHeaderButton = {
  backgroundColor: 'brand.blue',
  color: '#fff',
  borderRadius: '2px',
};

const appFooterWrapper = {
  w: 'full',
  align: 'center',
  justify: 'space-between',
};

const appFooterUl = {
  display: 'flex',
  listStyleType: 'none',
  w: breackpointsAppFooterList,
  justifyContent: breakpointsFooterFlex,
  mr: 'auto',
  m: breakpointsFooterListMargin,
};

const appFooterParent = {
  h: { base: 'full', md: '150px' },
  p: breackpointsAppFooterPadding,
};

const appBannerWrapper = {
  w: breackpointsBannerWidth,
  h: { base: '220px', md: '300px' },
  mt: '40px',
  borderRadius: '10px',
  padding: breackpointsBannerPadding,
};

const appBannerHeading = {
  fontWeight: '700',
  fontSize: { base: '20px', sm: '25px', xl: '39px' },
  lineHeight: { base: '28px', xl: '46px' },
};
const appBannerText = {
  fontWeight: '400',
  fontSize: { base: '17px', sm: '24px' },
  lineHeight: '28px',
  mt: '15px',
};

export {
  containerStyles,
  restaurantsListGrid,
  restaurantItemWrapper,
  restaurantItemMinutesBlock,
  restaurantItemRating,
  restaurantItemRatingBefore,
  restaurantItemFlex,
  restaurantItemText,
  restaurantPageFlex,
  restaurantPageHeading,
  restaurantInfoRating,
  restaurantInfoText,
  mainPageHeading,
  mainPageInput,
  mainPageFlex,
  checkoutPageWrapper,
  checkoutPageGrid,
  checkoutPageFlex,
  checkoutPageUl,
  checkoutPageUlTwo,
  checkoutPageListItem,
  checkoutPageTerms,
  checkoutPagePrivacy,
  modalLoginFormButton,
  modalCartButtonCheckout,
  modalCartTextTotal,
  modalCartButtonCancel,
  modalCartList,
  menuListLink,
  menuListGrid,
  checkoutItemListItem,
  checkoutFormApplePayButton,
  checkoutFormGridItem,
  checkoutFormBefore,
  checkoutFormAfter,
  checkoutFormChoiceStyle,
  checkoutFormSelect,
  checkoutFormInput,
  checkoutFormButtonSubmit,
  cartItemTextPositionName,
  cartItemListItem,
  cartItemTextPrice,
  cartItemButton,
  cartItemFlexControls,
  cartItemImage,
  logoWrapper,
  logoText,
  appHeaderWrapper,
  appHeaderInputGroup,
  appHeaderInput,
  appHeaderButton,
  appFooterWrapper,
  appFooterUl,
  appFooterParent,
  appBannerWrapper,
  appBannerHeading,
  appBannerText,
};
