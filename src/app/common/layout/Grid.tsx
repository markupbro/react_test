import React from "react";
import styles from "./Grid.module.scss";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number; // 기본 18
  gap?: number | string; // gap(px, rem, etc)
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number; // 차지할 칼럼 수 (1~18)
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  columns = 18,
  gap = 5,
  children,
  style,
  className = "",
  ...props
}) => (
  <div
    className={`${styles.grid} ${className}`}
    style={{
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export const GridItem: React.FC<GridItemProps> = ({
  span = 1,
  children,
  style,
  className = "",
  ...props
}) => (
  <div
    className={`${styles.gridItem} ${className}`}
    style={{
      gridColumn: `span ${span}`,
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);
