import React, { useRef } from 'react'

/* Shared Components */
import Button from '../button'
import Flex from '../flex'

/* Assets */
import './styles.css'
import {
  Xmark
} from 'iconoir-react'

const Dialog = ({ title="Dialog", ref, ...props }) => {
  return (
    <dialog 
      {...props} 
      className={[
        "cs-dialog",
        props.className || ""
      ].join(" ").trim()}
      ref={ref}
    >
      <Flex direction="column" gap={10} padding={20} grow={1}>
        <Flex direction="row" justify="between" align="center" grow={1}>
          <h2>{title}</h2>
          <Button 
            aria-label="Close dialog"
            round 
            onClick={() => {
              ref.current.close();
            }}
          >
            <Xmark />
          </Button>
        </Flex>
        { props.children }
      </Flex>
    </dialog>
  );
}

export default Dialog;