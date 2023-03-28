/* eslint-disable import/named */
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import PropsTypes from "prop-types";
import React from "react";
import {
  breackpointsCartListPadding,
  breackpointsCartWidth,
  breakpointsModalLoginPadding,
} from "../../theme/breakpoints";

function ModalTemplate({ Component, dataType, isOpen, onClose }) {
  const size = dataType === "modalCart" ? "cartW" : "loginW";
  const items =
    dataType === "modalCart"
      ? { w: breackpointsCartWidth, p: breackpointsCartListPadding }
      : { w: "loginW", p: breakpointsModalLoginPadding };
  return (
    <Box>
      <Modal
        isCentered
        size={{ base: "full", md: size }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent w={items.w}>
          <ModalCloseButton />
          <ModalBody p={items.p}>
            <Component onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

ModalTemplate.propTypes = {
  Component: PropsTypes.func.isRequired,
  dataType: PropsTypes.string.isRequired,
  isOpen: PropsTypes.bool.isRequired,
  onClose: PropsTypes.func.isRequired,
};
export default ModalTemplate;
