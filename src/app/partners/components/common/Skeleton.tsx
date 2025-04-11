"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-neutral-900 rounded-md ${className}`}
    ></div>
  );
};

export default Skeleton;
