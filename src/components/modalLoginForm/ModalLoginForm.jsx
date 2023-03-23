import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import React, { useState } from "react";

const ModalLoginForm = ({ onClose }) => {
  const [type, setType] = useState(true);

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
      alert(JSON.stringify(values, null, 2));
      formik.resetForm({ name: "", email: "" });
    },
  });

  // for change type input
  const setTypePassword = () => {
    setType((type) => !type);
  };

  const changeTypeInput = type ? "password" : "text";

  return (
    <Flex align="center" justify="center">
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={"4"} align="center">
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
            ></Checkbox>
            <FormLabel m="0" htmlFor="checbox_password">
              Показать пароль?
            </FormLabel>
          </Flex>
          <Button
            backgroundColor="brand.blue"
            color="#fff"
            borderRadius="2px"
            type="submit"
            onClick={onClose}
          >
            Войти в систему
          </Button>
        </VStack>
      </form>
    </Flex>
  );
};

export default ModalLoginForm;
