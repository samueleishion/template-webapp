import { useCallback, useContext, useEffect, useRef, useState } from 'react';

/* Global Data */ 
import useAppState, { actionTypes } from '../../../data/app-state'; 
import { 
  getTokens,
  postTokens,
  deleteToken
} from '../../../data/api';

/* Shared Components */ 
import Button from '../../../components/button';
import Dialog from '../../../components/dialog';
import Flex from '../../../components/flex';
import Input, { InputContainer, InputField } from '../../../components/input';

/* Assets */
import {
  Copy,
  Eye,
  EyeClosed,
  KeyPlus,
  Trash,
  Xmark
} from 'iconoir-react';
import Card from '../../../components/card';
import './developer-styles.css'

const TokenKeyInput = ({ value }) => {
  const [appState, dispatch] = useContext(useAppState);
  const [showKey, setShowKey] = useState(false);

  return (
    <InputContainer style={{ padding: '9px', gap: '9px' }}>
      <InputField
        type={showKey ? "text" : "password"}
        value={value}
        readOnly
        aria-label="Token key"
        style={{ fontFamily: 'monospace' }}
      />
      <Button 
        variant="outlined" 
        size="small"
        round
        aria-label="View token key"
        onClick={() => {
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
          dispatch({
            type: actionTypes.setAlertOn,
            payload: { type: 'success', message: 'Token key copied to clipboard!' }
          });
        }}
      >
        <Copy /> 
      </Button>
    </InputContainer>
  );
}

const DeveloperSettings = () => {
  const [appState, dispatch] = useContext(useAppState);
  const [tokens, setTokens] = useState([]);
  const [tokenName, setTokenName] = useState('');
  const dialogRef = useRef(null);

  const fetchTokens = useCallback(() => {
    // Fetch existing tokens when component mounts
    dispatch({ 
      type: actionTypes.setLoadingOn, 
      payload: 'DeveloperSettings.getTokens' 
    });
    getTokens({ 
        userId: appState.supervisedSession._id 
      }, 
      (error, data) => {
        dispatch({ type: actionTypes.setLoadingOff, payload: 'DeveloperSettings.getTokens' });

        if (error) {
          console.error("Error fetching tokens:", error);
          dispatch({
            type: actionTypes.setAlertOn,
            payload: { type: 'error', message: 'Failed to fetch tokens.' }
          });
          return;
        }
        
        console.log("Fetched tokens:", data);
        setTokens(data);
      }
    );
  }, [tokens])

  const handleTokenNameChange = (e) => {
    setTokenName(e.target.value);
  };

  const handleReset = () => {
    setTokenName('');
    dialogRef.current.close();
  };

  const handleGenerateToken = () => {
    // Logic to generate token
    console.log("Generating token:", tokenName);
    dispatch({
      type: actionTypes.setLoadingOn,
      payload: 'Generating token'
    })

    postTokens({ 
      name: tokenName,
      userId: appState.supervisedSession._id
     }, (error, data) => {
      dispatch({
        type: actionTypes.setLoadingOff,
        payload: 'Generating token'
      })

      if (error) {
        console.error("Error generating token:", error);
        dispatch({
          type: actionTypes.setAlertOn,
          payload: {
            type: 'error',
            message: `Error generating token: ${error.message}`
          }
        });
        return;
      } else {
        console.log("Token generated successfully:", data);
        setTokens([...tokens, data]); 
        // Optionally, you can update the app state or show a success message
        dispatch({
          type: actionTypes.setAlertOn,
          payload: {
            type: 'success',
            message: `Token "${tokenName}" generated successfully!`
          }
        });
      }
    });
    dialogRef.current.close();
    setTokenName(''); 
  }

  const handleDeleteToken = (tokenId) => {
    dispatch({
      type: actionTypes.setLoadingOn,
      payload: 'Deleting token'
    })
    deleteToken(tokenId, (error) => {
      dispatch({
        type: actionTypes.setLoadingOff,
        payload: 'Deleting token'
      })

      if (error) {
        console.error("Error deleting token:", error);
        dispatch({
          type: actionTypes.setAlertOn,
          payload: { type: 'error', message: `Error deleting token: ${error.message}` }
        });
        return;
      } else {
        console.log("Token deleted successfully");
        setTokens(tokens.filter(t => t._id !== tokenId));
        dispatch({
          type: actionTypes.setAlertOn,
          payload: { type: 'success', message: 'Token deleted successfully!' }
        });
      }
    });
  }

  useEffect(() => {
    fetchTokens()
  }, []);

  return (<>
    <section>
      <h2>Developer</h2>
      <p>Here you can configure developer-specific settings.</p>
    </section>
    <section>
      <h3>Tokens</h3>
      <Flex direction="column" gap={12}>
        <p>Manage your developer tokens here.</p>
        <Card variant={"outlined"} style={{ padding: '6px', gap: '9px' }}>
          {tokens.length > 0 ? (
            tokens.map(token => (
              <Flex direction="row" justify="space-between" align="center" gap={9} className="cs-token-container" key={token._id}>
                <Flex style={{ flexGrow: 1 }}>
                  <strong style={{ fontFamily: 'monospace' }}>{token.name}</strong>
                </Flex>
                <Flex direction="row" justify="flex-end" align="center" gap={6} style={{ flexGrow: 1 }}>
                  <TokenKeyInput value={token.key} />
                </Flex>
                <Flex direction="row" justify="flex-end" align="center" gap={6}>
                  <Button
                    variant="outlined"
                    size="small"
                    round
                    aria-label="Delete token"
                    onClick={() => {
                      handleDeleteToken(token._id);
                    }}
                  >
                    <Trash />
                  </Button>
                </Flex>
              </Flex>
            ))
          ) : (
            <p>No tokens available.</p>
          )}
        </Card>
        <div>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => dialogRef.current.showModal()}
          >
            <KeyPlus />
            <span>Generate Token</span>
          </Button>
        </div>
      </Flex>
    </section>
    <Dialog ref={dialogRef} title="Generate token">
      Generate token 
      <Flex tag={<form onSubmit={handleGenerateToken} onReset={handleReset} />} direction="column" gap={10} padding={20}>
        <Input 
          type="text" 
          name="Token Name"
          label="Token Name"
          placeholder="Enter token name"
          onChange={handleTokenNameChange}
          value={tokenName}
        />
        <Flex direction="row" justify="flex-end" align="center" gap={6}>
          <Button 
            type="reset"
            variant="outlined" 
            onClick={handleReset}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="filled" 
            disabled={!tokenName}
            onClick={handleGenerateToken}
          >
            Generate
          </Button>
        </Flex>
      </Flex>
    </Dialog>
  </>);
};

export default DeveloperSettings;