'use client'; // Error boundaries 必须在 客户端 使用

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 打印错误到错误报告服务
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>出错了!</h2>
      <button
        onClick={
          // 尝试通过重新渲染段来恢复
          () => reset()
        }
      >
        重试
      </button>
    </div>
  );
}
