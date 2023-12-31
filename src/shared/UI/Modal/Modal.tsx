import {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './modal.module.scss';
import Portal from '../Portal/Portal';
import { useTheme } from 'App/providers/ThemeProvider';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isVisible?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { className, children, isVisible, onClose, lazy } = props;

  const [isClosed, setClosure] = useState(false);

  const [isMount, setMount] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setMount(true);
    }
  }, [isVisible]);

  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const { theme } = useTheme();

  const mods: Mods = {
    [cls.visible]: isVisible,
    [cls.isClosing]: isClosed,
  };

  const closeHandler = useCallback(() => {
    if (onClose) {
      onClose();
      timeRef.current = setTimeout(() => {
        onClose();
        setClosure(false);
      }, 300);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler],
  );

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isVisible, onKeyDown]);

  if (lazy && !isMount) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className, theme])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={onContentClick}>
            {children}{' '}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;

// {classNames(cls.content, {
//     [cls.contentVisible]: isVisible,
//   })}
