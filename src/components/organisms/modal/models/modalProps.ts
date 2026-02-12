import type { IconName } from "@/components/atoms/icon/iconName";
import { ReactNode } from "react";

export interface ModalProps extends React.PropsWithChildren {
  className?: string;
  title?: ReactNode;
  show: boolean;
  showCloseBtn?: boolean;
  width?: string;
  height?: string;
  icon?: IconName;
  onHide: () => void;
}
