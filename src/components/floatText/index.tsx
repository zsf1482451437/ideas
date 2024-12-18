import React, { useEffect, useState, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classNames.bind(styles);

interface FloatTextProps {
  text: string;
  duration?: number; // 动画持续时间，默认1秒
  children?: ReactNode;
  onEnd?: () => void; // 动画结束时的回调
}

const FloatText: React.FC<FloatTextProps> = ({
  text,
  duration = 1000,
  children,
  onEnd,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onEnd) onEnd();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onEnd]);

  return (
    <div className={cn('wrapper')}>
      {children}
      {visible && <div className={cn('floating')}>{text}</div>}
    </div>
  );
};

export default FloatText;
