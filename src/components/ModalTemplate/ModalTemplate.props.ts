export interface ModalProps {
  onClose: () => void;
}
export interface ModalTemplateProps {
  Component: JSX.Element;
  dataType: 'modalCart' | 'modalLogin';
  isOpen: boolean;
  onClose: () => void;
}
