import classNames from "classnames";
import { FC } from "react";
import { createPortal } from "react-dom";
import { ChildrenProps, ClassNameProps } from "../../utils/types";
import classes from "./FullscreenModal.module.scss";

type FSModalComp = FC<ChildrenProps> & {
    ButtonsPanel: FC<ClassNameProps & ChildrenProps>;
    Header: FC<ClassNameProps & ChildrenProps>;
    Title: FC<ClassNameProps & ChildrenProps>;
}

/**
 * This component has been written in React-Bootstrap style. 
 * Each sub-component accepts a custom className to be added to the built-in one.
 * 
 * Use FullscreenModal.Header for the styled header. 
 * 
 * Use FullscreenModal.Title inside the header for the styled title. 
 * 
 * Use FullscreenModal.ButtonsPanel for the bottom panel where you can stack buttons and other stuff.
 * 
 * @param children React children
 */
const FullscreenModal: FSModalComp = ({ children }) => {
    return createPortal(
        <div className={classes.fullscreenModal}>
            {children}
        </div>,
        document.body
    )
}
FullscreenModal.ButtonsPanel = ({ className, children }) => <div className={classNames(classes.buttonsPanel, className)}>{children}</div>;
FullscreenModal.Header = ({ className, children }) => <div className={classNames(classes.header, className)}>{children}</div>;
FullscreenModal.Title = ({ className, children }) => <h1 className={classNames(classes.title, className)}>{children}</h1>;


export default FullscreenModal;