import { useState, useEffect, useRef, useCallback } from 'react';

interface Node {
  visible: boolean;
  [key: string]: any;
}

interface UseProcessControlReturn {
  visibleNodes: Node[];
  currentIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
  handleJumpTo: (index: number) => void;
  handlePause: () => void;
  handleResume: () => void;
  isPaused: boolean;
}

const useProcessControl = (nodes: Node[], delay: number): UseProcessControlReturn => {
  const [visibleNodes, setVisibleNodes] = useState<Node[]>(
    nodes.map((node) => ({ ...node, visible: false }))
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const showNodes = useCallback(
    (nodes: Node[], startIndex: number) => {
      setVisibleNodes(
        nodes.map((node, i) => ({ ...node, visible: i <= startIndex }))
      );

      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];

      nodes.forEach((_, index) => {
        if (index > startIndex) {
          const timeout = setTimeout(
            () => {
              if (!isPaused) {
                setVisibleNodes((prev) => {
                  setCurrentIndex(index);
                  return prev.map((node, i) =>
                    i === index ? { ...node, visible: true } : node
                  );
                });
              }
            },
            (index - startIndex) * delay
          );
          timeoutRefs.current.push(timeout);
        }
      });
    },
    [delay, isPaused]
  );

  useEffect(() => {
    showNodes(nodes, currentIndex);
  }, [currentIndex, delay, nodes, showNodes]);

  const handleNext = () => {
    if (currentIndex < nodes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleJumpTo = (index: number) => {
    if (index >= 0 && index < nodes.length) {
      setCurrentIndex(index);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
    timeoutRefs.current.forEach(clearTimeout);
  };

  const handleResume = () => {
    setIsPaused(false);
    showNodes(nodes, currentIndex);
  };

  return {
    visibleNodes,
    currentIndex,
    handleNext,
    handlePrev,
    handleJumpTo,
    handlePause,
    handleResume,
    isPaused,
  };
};

export default useProcessControl;
