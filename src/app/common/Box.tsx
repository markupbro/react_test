import React from "react";
import styles from "./Box.module.scss";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  radius?: string;
  p?: string;
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ color, radius, p, children, ...props }) => {
  console.log(color);
  return (
    <div
      className={`
        ${styles["box-wrap"]} 
        ${color ? styles[color] : ""} 
        ${radius ? styles[radius] : ""} 
        ${p ? styles[p] : ""} `}
    >
      {children}
    </div>
  );
};

export default Box;
