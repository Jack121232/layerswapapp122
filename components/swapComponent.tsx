import React, { useEffect, useState } from 'react';
import { FC } from 'react'
import { SwapDataProvider } from '../context/swap';
import { UserExchangeProvider } from '../context/userExchange';
import { MenuProvider } from '../context/menu';
import IntroCard from './introCard';
import CreateSwap from './Wizard/CreateSwapWizard';
import { AuthStep, SwapCreateStep } from '../Models/Wizard';
import { FormWizardProvider } from '../context/formWizardProvider';
import inIframe from './utils/inIframe';
import { useAuthState, UserType } from '../context/authContext';
import GuestCard from './guestCard';
import { TimerProvider } from '../context/timerContext';


const Swap: FC = () => {
  const [embadded, setEmbadded] = useState<boolean>()
  const { userType } = useAuthState()
  useEffect(() => {
    setEmbadded(inIframe())
  }, [])

  return (
    <div className="text-white">
      <MenuProvider>
        <SwapDataProvider >
          <UserExchangeProvider>
            <TimerProvider>
              <FormWizardProvider initialStep={SwapCreateStep.MainForm} initialLoading={false}>
                <CreateSwap />
              </FormWizardProvider>
              {
                !embadded && userType && userType != UserType.AuthenticatedUser &&
                <FormWizardProvider initialStep={AuthStep.Email} initialLoading={false} hideMenu>
                  <GuestCard />
                </FormWizardProvider>
              }
            </TimerProvider>
          </UserExchangeProvider>
        </SwapDataProvider >
      </MenuProvider>
      {
        !embadded &&
        <IntroCard />
      }
    </div >
  )
};

export default Swap;