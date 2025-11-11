import { IconName } from "./iconName";

export interface ModalProps extends React.PropsWithChildren {
  className?: string;
  title?: string;
  show: boolean;
  showCloseBtn?: boolean;
  width?: string;
  height?: string;
  onHide: () => void;
  path?: string;
  closeRedirectUrl?: string;
  isDirty?: boolean;
  openIfPathEndsWith?: string;
  icon?: IconName;
}
