import React from "react";

interface GeneralCardOfNavbarProps {
  ico?: React.ElementType;
  title?: string;
}

export const GeneralCardOfNavbar: React.FC<GeneralCardOfNavbarProps> = ({
  ico: Icon,
  title,
}) => {
  return (
    <div className={``}>
      <div className="flex flex-col items-center justify-center gap-1 ">
        {Icon && <Icon className="text-2xl" />}{" "}
        <h2 className="text-text font-medium text-sm !capitalize ">{title}</h2>
      </div>
    </div>
  );
};
