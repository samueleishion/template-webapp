import { useContext, useState } from 'react';

/* Global State */
import useAppState, { actionTypes } from '../../../data/app-state';

/* Shared Components */
import Button from '../../button';
import { InputContainer, InputField } from '../index';

/* Assets */
import { 
  Eye, 
  EyeClosed, 
  Copy 
} from 'iconoir-react';
import './secret.css';

const InputSecret = ({ value="", onToggle=() => {}, onCopy=() => {} }) => {
  const [appState, dispatch] = useContext(useAppState);
  const [showKey, setShowKey] = useState(false);

  return (
    <InputContainer className="cs-input-secret-container" style={{ padding: '9px', gap: '9px' }}>
      <InputField
        type={showKey ? "text" : "password"}
        value={value}
        readOnly
        aria-label="Token key"
      />
      <Button 
        variant="outlined" 
        size="small"
        round
        aria-label="View token key"
        onClick={() => {
          onToggle(!showKey); 
          setShowKey(!showKey);
        }}
      >
        { showKey ? <EyeClosed /> : <Eye /> }
      </Button>
      <Button 
        variant="outlined" 
        size="small"
        round
        aria-label="Copy token key"
        onClick={() => {
          navigator.clipboard.writeText(value);
          onCopy()
        }}
      >
        <Copy /> 
      </Button>
    </InputContainer>
  );
}

export default InputSecret;