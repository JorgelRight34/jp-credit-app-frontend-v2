import { IconName } from "@/models";

export interface ModalProps extends React.PropsWithChildren {
  className?: string;
  title?: string;
  show: boolean;
  showCloseBtn?: boolean;
  width?: string;
  height?: string;
  path?: string;
  closeRedirectUrl?: string;
  isDirty?: boolean;
  openIfPathEndsWith?: string;
  icon?: IconName;
  onHide: () => void;
}
