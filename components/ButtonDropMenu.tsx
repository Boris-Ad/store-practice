'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';

export const ButtonDropMenu = ({
  children,
  isVisible,
  removeMenu,
  buttonRef,
}: {
  children: React.ReactNode;
  isVisible: boolean;
  removeMenu: () => void;
  buttonRef: HTMLButtonElement;
}) => {
  const position = buttonRef.getBoundingClientRect();
  const shift = position.x > innerWidth / 2;
  const x = useMotionValue(shift ? position.right : position.left);
  const y = useMotionValue(position.y + position.height + 7);

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <div onClick={removeMenu} className="absolute inset-0 z-30">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ y, x, translateX: shift ? '-100%' : 0 }}
            transition={{duration:0.2}}
            onClick={e => e.stopPropagation()}
            className="min-w-40 absolute rounded-md shadow-lg z-40 translate-x-0 overflow-hidden"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
