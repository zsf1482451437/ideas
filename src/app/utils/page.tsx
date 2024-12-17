import React from 'react';

import MemoryTrail from '@/components/memoryTrail';
import type { MemoryNode } from '@/components/memoryTrail';
import BasicDatePicker from '@/components/datePicker';

const DELAY = 1500;

const SRC = '/logo.svg';

const nodes: MemoryNode[] = [
  { image: SRC, text: 'Node 1', visible: false },
  { image: SRC, text: 'Node 2', visible: false },
  { image: SRC, text: 'Node 3', visible: false },
  { image: SRC, text: 'Node 4', visible: false },
  { image: SRC, text: 'Node 5', visible: false },
];

export default function Utils() {
  return (
    <div>
      <h2>Utils</h2>
      <MemoryTrail nodes={nodes} delay={DELAY} lineType="curved" />
      <BasicDatePicker />
    </div>
  );
}
