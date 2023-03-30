/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Image,
  Input,
  InputGroup,
  Select,
  VStack,
} from "@chakra-ui/react";

import * as Yup from "yup";
import { useFormik } from "formik";
import valid from "card-validator";

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import applePay from "../../assets/applePay.svg";
import foodService from "../../services/foodService";
import { ShopContext } from "../../context/shop-context";

function CheckoutForm({ amountWithTaxes }) {
  const navigate = useNavigate();
  const { addNewDoc } = foodService();
  const { clearCart, cart, data } = useContext(ShopContext);

  const createCartObj = () => {
    const cartPositions = {};
    // eslint-disable-next-line array-callback-return
    data.map((item) => {
      if (+cart[item.id] !== 0 && cart[item.id] !== undefined) {
        cartPositions[item.id] = item.name;
      }
    });
    return cartPositions;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      creditCard: "",
      YYMM: "",
      CVC: "",
      nameOnCard: "",
      region: "",
      index: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Неправильно введена почта!")
        .required("Обязательное поле"),
      creditCard: Yup.string()
        .max(16, "Минимальная длина 16!")
        .test(
          "test-number", // this is used internally by yup
          "Номер карты не действителен", // validation message
          (value) => valid.number(value).isValid
        )
        .required("Обязательное поле"),
      CVC: Yup.string()
        .min(3, "Минимальная длинна 3!")
        .max(4, "Максимальная длина 4!")
        .test(
          "test-number", // this is used internally by yup
          "Номер карты не действителен", // validation message
          (value) => valid.cvv(value).isValid
        )

        .required("Обязательное поле"),
      YYMM: Yup.string()
        .max(4, "Максимальная длина 4!")
        .test(
          "test-number", // this is used internally by yup
          "Карта просроченна", // validation message
          (value) => valid.expirationDate(value).isValid
        ),

      nameOnCard: Yup.string()
        .required("Обязательное поле")
        .test(
          "test-number", // this is used internally by yup
          "Имя фамилия введена неправильно", // validation message
          (value) => valid.cardholderName(value).isValid
        ),
      region: Yup.string().required("Обязательное поле"),
      index: Yup.string()
        .required("Обязательное поле")
        .min(5, "Минимальная длина 5!")
        .test(
          "test-number", // this is used internally by yup
          "Имя фамилия введена неправильно", // validation message
          (value) => valid.postalCode(value).isValid
        ),
    }),
    onSubmit: (values) => {
      if (amountWithTaxes) {
        // eslint-disable-next-line no-unused-vars
        const numberOrder = Math.floor(Math.random() * (12414 - 1000) + 1000);
        const cartPos = createCartObj();
        addNewDoc("ORDERS", {
          email: values.email,
          name: values.nameOnCard,
          orderNum: numberOrder,
          region: values.region,
          cart: { ...cartPos },
        });
        navigate("/");
        clearCart();
      }
    },
  });

  return (
    <GridItem w="421px" h="full" justifySelf="center">
      <Button
        backgroundColor="#000"
        boxShadow=" 0px -1px 1px rgba(0, 0, 0, 0.12), 0px 2px 5px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.08)"
        h="48px"
        w="full"
        _hover={{ backgroundColor: "rgba(0,0,0,.6)" }}
      >
        <Image src={applePay} />
      </Button>
      <Box
        mt="32px"
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          left: "-5px",

          top: "50%",
          width: "125px",
          height: "1px",
          backgroundColor: "rgba(60, 66, 87,.12)",
        }}
        _after={{
          content: '""',
          position: "absolute",
          right: "-5px",

          top: "50%",
          width: "125px",
          height: "1px",
          backgroundColor: "rgba(60, 66, 87,.12)",
        }}
        textAlign="center"
        color=" #8792A2"
        fontWeight="400"
        fontSize="16px"
        lineHeight="24px"
      >
        Или оплатить картой
      </Box>

      <Flex mt="32px">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing="32px">
            <FormControl>
              <FormLabel color="#697386">Электронная почта</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                name="email"
                type="email"
                w="421px"
              />
              {formik.touched.email && formik.errors.email ? (
                <Box color="#E53E3E" mt="15px">
                  {formik.errors.email}
                </Box>
              ) : null}
            </FormControl>
            <FormControl>
              <FormLabel color="#697386">Кредитная карточка</FormLabel>
              <Input
                id="credit-card"
                name="creditCard"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.creditCard}
                onBlur={formik.handleBlur}
                placeholder="1234 1234 1234 1234"
                borderRadius="8px 8px 0px 0px"
              />
              {formik.touched.creditCard && formik.errors.creditCard ? (
                <Box color="#E53E3E" mt="15px">
                  {formik.errors.creditCard}
                </Box>
              ) : null}
              <InputGroup>
                <Input
                  name="YYMM"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.YYMM}
                  onBlur={formik.handleBlur}
                  placeholder="MM/YY"
                  borderRadius="0px 0px 0px 8px"
                />

                {formik.touched.YYMM && formik.errors.YYMM ? (
                  <>
                    <br />
                    <Box color="#E53E3E" mt="15px">
                      {formik.errors.YYMM}
                    </Box>
                  </>
                ) : null}
                <Input
                  name="CVC"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.CVC}
                  onBlur={formik.handleBlur}
                  placeholder="CVC"
                  borderRadius="0px 0px 8px 0px"
                />
                {formik.touched.CVC && formik.errors.CVC ? (
                  <Box color="#E53E3E" mt="15px">
                    {formik.errors.CVC}
                  </Box>
                ) : null}
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel color="#697386">Имя на карте</FormLabel>
              <Input
                name="nameOnCard"
                onChange={formik.handleChange}
                value={formik.values.nameOnCard}
                onBlur={formik.handleBlur}
                type="text"
                w="421px"
              />
              {formik.touched.nameOnCard && formik.errors.nameOnCard ? (
                <Box color="#E53E3E" mt="15px">
                  {formik.errors.nameOnCard}
                </Box>
              ) : null}
            </FormControl>
            <FormControl>
              <FormLabel color="#697386">Область</FormLabel>
              <Select
                onChange={formik.handleChange}
                value={formik.values.region}
                onBlur={formik.handleBlur}
                name="region"
                borderRadius="8px 8px 0px 0px"
                placeholder="Выберите область"
                variant="outline"
              >
                <option value="Одесская область">Одесская область</option>
                <option value="Днепропетровская область">
                  Днепропетровская область
                </option>
                <option value="Житомирская область">Житомирская область</option>
                <option value="Полтавская область">Полтавская область</option>
                <option value="Херсонская область">Херсонская область</option>
                <option value="Киевская область">Киевская область</option>
                <option value="Запорожская область">Запорожская область</option>
                <option value="Луганская область">Луганская область</option>
                <option value="Донецкая область">Донецкая область</option>
                <option value="Винницкая область">Винницкая область</option>
                <option value="АР Крым">АР Крым</option>
                <option value="Кировоградская область">
                  Кировоградская область
                </option>
                <option value="Николаевская область">
                  Николаевская область
                </option>
                <option value="Сумская область">Сумская область</option>
                <option value="Львовская область">Львовская область</option>
                <option value="Черкасская область">Черкасская область</option>
                <option value="Хмельницкая область">Хмельницкая область</option>
                <option value="Волынская область">Волынская область</option>
                <option value="Ровненская область">Ровненская область</option>
                <option value="Ивано-Франковская область">
                  Ивано-Франковская область
                </option>
                <option value="Тернопольская область">
                  Тернопольская область
                </option>
                <option value="Закарпатская область">
                  Закарпатская область
                </option>
                <option value="Черновицкая область">Черновицкая область</option>
              </Select>
              {formik.touched.region && formik.errors.region ? (
                <Box color="#E53E3E" mt="15px">
                  {formik.errors.region}
                </Box>
              ) : null}
              <Input
                onChange={formik.handleChange}
                value={formik.values.index}
                onBlur={formik.handleBlur}
                name="index"
                w="421px"
                borderRadius=" 0px 0px 8px 8px"
                color="#697386"
                placeholder="Индекс"
              />
              {formik.touched.index && formik.errors.index ? (
                <Box color="#E53E3E" mt="15px">
                  {formik.errors.index}
                </Box>
              ) : null}
            </FormControl>
            <Button
              type="submit"
              h="48px"
              background="brand.blue"
              color=" #FFF"
              w="full"
              isDisabled={!amountWithTaxes}
              _hover={{ background: "rgba(24, 144, 255,.5)" }}
            >
              Оплатить ₴{amountWithTaxes}
            </Button>
          </VStack>
        </form>
      </Flex>
    </GridItem>
  );
}

CheckoutForm.propTypes = {
  amountWithTaxes: PropTypes.number.isRequired,
};

export default CheckoutForm;
