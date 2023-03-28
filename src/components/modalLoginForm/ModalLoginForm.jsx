import PropsTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import React, { useRef, useState } from "react";

function ModalLoginForm({ onClose }) {
  const toast = useToast();
  const toastIdRef = useRef();
  const [type, setType] = useState(true);
  const addToast = (values) => {
    toastIdRef.current = toast({
      description: `Здравствуйте ${values}, вы успешно зашли в систему`,
      status: "success",
      isClosable: true,
    });
  };
  // object Formik for validation and submiting
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Неправильно введена почта!")
        .required("Обязательное поле"),
      password: Yup.string()
        .min(7, "Минимальная длинна пароля 7!")
        .required("Обязательное поле"),
    }),
    onSubmit: (values) => {
      formik.resetForm({ name: "", email: "" });
      addToast(values.email);
      onClose();
    },
  });

  // for change type input
  const setTypePassword = () => {
    // eslint-disable-next-line no-shadow
    setType((type) => !type);
  };

  const changeTypeInput = type ? "password" : "text";

  return (
    <>
      <Heading as="h3" mt="20px" fontSize="23px" textAlign="center">
        Вход в профиль
      </Heading>
      <Flex mt="20px" align="center" justify="center">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing="4" align="center">
            <FormControl>
              <FormLabel htmlFor="email">Электронная почта</FormLabel>
              <Input
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <Box color="#E53E3E" mt="15px">
                  {formik.errors.email}
                </Box>
              ) : null}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <Input
                id="password"
                name="password"
                type={changeTypeInput}
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <Box color="#E53E3E" mt="15px">
                  {formik.errors.password}
                </Box>
              ) : null}
            </FormControl>

            <Flex w="170px" justify="space-evenly">
              <Checkbox
                id="checbox_password"
                onChange={() => setTypePassword()}
              />
              <FormLabel m="0" htmlFor="checbox_password">
                Показать пароль?
              </FormLabel>
            </Flex>
            <Button
              backgroundColor="brand.blue"
              color="#fff"
              borderRadius="2px"
              type="submit"
            >
              Войти в систему
            </Button>
          </VStack>
        </form>
      </Flex>
    </>
  );
}
ModalLoginForm.propTypes = {
  onClose: PropsTypes.func.isRequired,
};

export default ModalLoginForm;
