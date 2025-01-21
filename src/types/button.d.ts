import { EButtonType } from '../constants';

type TButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  type?: EButtonType;
};
