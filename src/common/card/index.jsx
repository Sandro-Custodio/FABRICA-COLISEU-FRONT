import React from "react";

const Card = ({
  children,
  color,
  title,
  footer,
  position,
  tools,
  border,
  classProps,
  ...others
}) => {
  const isBorder = border ? "box-header with-border" : "box-header";
  const isPosition = position ? `box-tools pull-${position}` : "box-tools";
  const isColor = color ? `box box-${color}` : "box box-default";
  return (
    <div className={`${isColor} ${classProps}`} {...others}>
      {(title || tools) && (
        <div className={isBorder}>
          {title && <div className="box-title">{title}</div>}
          {tools && <div className={isPosition}>{tools}</div>}
        </div>
      )}
      <div className="box-body">{children}</div>
      {footer && <div className="box-footer">{footer}</div>}
    </div>
  );
};

Card.defaultProps = {
  color: "primary",
  headerposition: "right"
};

export default Card;
