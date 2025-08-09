import { useCallback, useContext, useEffect, useState } from 'react';

/* Global State */
import useAppState, { actionTypes } from '../../../data/app-state';
import { 
  getPaymentMethods 
} from '../../../data/api';

/* Shared Components */ 
import Button from '../../../components/button';
import { CardList, CardListItem } from '../../../components/card'
import Flex from '../../../components/flex';

/* Assets */ 
import {
  CardShield,
  CreditCard,
  EditPencil,
  Trash
} from 'iconoir-react'

const DEFAULT_PAYMENT_METHODS = [
  {
    id: 'pm_1',
    object: 'payment_method', 
    type: 'card',
    card: {
      last4: '4242',
      exp_month: '12',
      exp_year: '2025',
      brand: 'Visa'
    }
  },
  {
    id: 'pm_2',
    object: 'payment_method', 
    type: 'card',
    card: {
      last4: '1111',
      exp_month: '11',
      exp_year: '2024',
      brand: 'Mastercard'
    }
  },
  {
    id: 'pm_3',
    object: 'payment_method', 
    type: 'card',
    card: {
      last4: '2222',
      exp_month: '10',
      exp_year: '2026',
      brand: 'Amex'
    }
  }
];

const PaymentMethodsSettings = () => {
  const [appState, dispatch] = useContext(useAppState);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const fetchPaymentMethods = useCallback(() => {
    // Fetch payment methods when component mounts
    dispatch({ 
      type: actionTypes.setLoadingOn, 
      payload: 'PaymentMethodsSettings.getPaymentMethods' 
    });
    
    getPaymentMethods({
      userId: appState.supervisedSession._id 
    }, 
    (error, data) => {
      dispatch({ type: actionTypes.setLoadingOff, payload: 'PaymentMethodsSettings.getPaymentMethods' });

      console.log("PaymentMethodsSettings.getPaymentMethods()", error, data);
      if (error) {
        console.error("Error fetching payment methods:", error);
        dispatch({
          type: actionTypes.setAlertOn,
          payload: { type: 'error', message: 'Failed to fetch payment methods.' }
        });
        return;
      }
      
      setPaymentMethods(data);
    });
  }, [appState.supervisedSession._id]);

  useEffect(() => {
    // This effect can be used to fetch payment methods or perform any setup needed
    console.log("PaymentMethodsSettings():useEffect([])", appState.supervisedSession);
    // fetchPaymentMethods();
    setPaymentMethods(DEFAULT_PAYMENT_METHODS);
  }, []);

  useEffect(() => {
    console.log("PaymentMethodsSettings():useEffect([paymentMethods])", paymentMethods);
  }, [paymentMethods]);

  return (<>
    <section>
      <h2>Payment Methods</h2>
      <p>Manage your payment methods here.</p>
    </section>
    <section>
      <Flex direction="column" gap={12}>
        <CardList>
          {paymentMethods.length > 0 
            ? paymentMethods.map((method, i) => (
                <CardListItem key={i}>
                  <CreditCard /> 
                  <Flex basis="120px" align="center" justify="center">{method.card.brand}</Flex>
                  <span>**** {method.card.last4}</span> 
                  <span>Exp: {method.card.exp_month}/{method.card.exp_year}</span>
                  <Flex direction="row" justify="flex-end" align="center" gap={6}>
                    <Button
                      variant="outlined"
                      size="small"
                      round 
                    >
                      <EditPencil />
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      round 
                    >
                      <Trash />
                    </Button>
                  </Flex>
                </CardListItem>
              )) 
            : <p>No payment methods available.</p>
          }
        </CardList>
        <div>
          <Button 
            variant="outlined"
            size="small"
          >
            <CardShield />
            Add Payment Method
          </Button>
        </div>
      </Flex>
    </section>
  </>);
};

export default PaymentMethodsSettings;