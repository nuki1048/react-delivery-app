import { ComponentType } from 'react';
export interface ModalProps {
  onClose: () => void;
}
type ComponentPropsType = ComponentType<ModalProps>;

export interface ModalTemplateProps {
  Component: ComponentPropsType;
  dataType: 'modalCart' | 'modalLogin';
  isOpen: boolean;
  onClose: () => void;
}
