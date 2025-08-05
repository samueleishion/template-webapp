import React, { cloneElement, useId } from 'react';

/* Shared Components */
import Flex from '../flex';

/* Assets */
import './styles.css';

const InputLabel = ({ required=false, ...props }) => {
  return (
    <label 
      {...props} 
      className={[
        "cs-input-label",
        props.className || ''
        ].join(' ').trim()
      }
    >
      {props.children}
      {props.required && <span className="cs-input-required">*</span>}
    </label>
  );
}

const InputField = ({ tag=<input />, ...props }) => {
  return (
    cloneElement(tag, {
      ...props,
      className: [
        "cs-input",
        props.className || ''
      ].join(' ').trim()
    })
  )
}; 

const InputMessage = ({ children, ...props }) => {
  return (
    <span 
      {...props} 
      className={[
        "cs-input-message",
        props.className || ''
      ].join(' ').trim()}
    >
      {children}
    </span>
  );
}

const InputContainer = ({ children, ...props }) => {
  return (
    <div 
      {...props} 
      className={[
        "cs-input-container",
        props.className || ''
      ].join(' ').trim()}
    >
      {children}
    </div>
  );
}

const Input = ({ label="Label", type="text", prefix=null, suffix=null, onChange=() => {}, ...props }) => {
  // Ensure the input has an ID for accessibility
  const inputId = props.id || useId();
  
  return (
    <Flex direction="column" gap={3} grow={1} style={{ inlineSize: '100%', margin: 'auto' }}>
      <InputLabel htmlFor={inputId} required={props.required}>
        {label}
      </InputLabel>
      <InputContainer>
        {props.prefix && <span>{props.prefix}</span>}
        {type === 'textarea' 
          ? <textarea 
            {...props}
            id={inputId}
            onChange={onChange}
            className={[
              "cs-input",
              props.className || ''
            ].join(' ').trim()}
          >
            {props.value}
          </textarea>
          : type === 'select' 
          ? <select 
            {...props} 
            id={inputId}
            onChange={onChange}
            className={[
              "cs-input",
              props.className || ''
            ].join(' ').trim()}
          >
            {props.children}
          </select>
          : <InputField 
            {...props} 
            id={inputId}
            onChange={onChange} 
          />
        }
        {props.suffix && <span>{props.suffix}</span>}
      </InputContainer>
      <InputMessage>
        {props.message}
      </InputMessage>
    </Flex>
  );
}

export { Input, InputLabel, InputField, InputMessage, InputContainer };

export default Input;