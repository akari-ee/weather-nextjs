'use client';

import React from 'react';

type Props = {};

export default function Splitter({
  id = 'drag-bar',
  dir,
  isDragging,
  ...props
}: any) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div
      id={id}
      data-testid={id}
      tabIndex={0}
      className='cursor-col-resize w-1 h-full bg-black/20'
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
}
