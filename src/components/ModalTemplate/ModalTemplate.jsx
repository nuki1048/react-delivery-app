import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import React from "react";

const ModalTemplate = ({ Component, dataType, isOpen, onClose }) => {
  const styleModals = {
    loginStyle: {
      width: "350px",
      height: "200px",
      padding: "20px 0",
    },
    cartStyle: {
      width: "780px",
      height: "552px",
      padding: "8px 45px 42px 45px ",
    },
  };
  const size = dataType === "modalCart" ? "cartW" : "loginW";
  const items =
    dataType === "modalCart" ? (
      <ModalContent w={styleModals.cartStyle.width}>
        <ModalCloseButton />
        <ModalBody padding={styleModals.cartStyle.padding}>
          <Component />
        </ModalBody>
      </ModalContent>
    ) : (
      <ModalContent w={"loginW"} p={styleModals.loginStyle.padding}>
        <ModalHeader textAlign="left">Вход в профиль</ModalHeader>
        <ModalCloseButton />
        <ModalBody minH={styleModals.loginStyle.height}>
          <Component />
        </ModalBody>
      </ModalContent>
    );
  return (
    <Box>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        {items}
      </Modal>
    </Box>
  );
};

export default ModalTemplate;
