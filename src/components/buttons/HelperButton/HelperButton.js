import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import cn from "classnames";

/**
 *
 * @param children
 * @param overlay: function | element
 *  An element or text to overlay next to the target.
 * @param timeDelayShow: number in millisecond
 * @param timeDelayHide: number in millisecond
 * @param placement: default is 'right'. Can select one: 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'
 * @param trigger: 'hover' | 'click' |'focus' | Array<'hover' | 'click' |'focus'>
 * @param classButton: class for button when has not define children
 * @returns {*}
 * @constructor
 */
const HelperButton = ({children, overlay, timeDelayShow, timeDelayHide, placement, trigger, classButton}) => {
  return (
    <OverlayTrigger
      placement={placement}
      delay={{
        show: timeDelayShow ? timeDelayShow : 250,
        hide: timeDelayHide ? timeDelayHide : 400
      }}
      overlay={overlay}
      trigger={trigger}
    >
      {children ?
        children :
        <Button type="button" className={cn("btn btn-default", {[classButton]: classButton})}>
          <FontAwesomeIcon icon={['fas', 'question-circle']}/>
        </Button>
      }
    </OverlayTrigger>
  );
};

export default HelperButton;