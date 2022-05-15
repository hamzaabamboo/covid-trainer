import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Train } from './pages/Train';
import { Leaderboard } from './pages/Leaderboard';

import { Navigation } from './components/Navigation';

import { useRainbowBackground } from './hooks/useRainbowBackground';
import { useLocalStorage } from './hooks/useLocalStorage';

import { UserProvider } from './UserProvider';

export default ()  => {
  const [epilepsy, setEpilepsy] = useLocalStorage<boolean>('epilepsy');

  const colors = useRainbowBackground();

  return epilepsy === null || epilepsy === true ? (
    <div className='min-h-screen max-w-lg mx-auto flex flex-col items-center justify-center p-4'>
      <h1 className='text-2xl'>
        This web may cause <span className='font-bold'>epilepsy</span>, u sure ?
      </h1>
      <div className='flex flex-row w-full justify-between'>
        <div className='w-full p-4 text-white text-center'>
          <button
            className='p-2 text-l rounded bg-blue-500 w-full'
            onClick={() => setEpilepsy(false)}
          >
            Sure
          </button>
        </div>
        <div className='w-full p-4 text-white text-center'>
          <button
            className='p-2 text-l rounded bg-red-500 w-full '
            onClick={() => window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
          >
            No
          </button>
        </div>
      </div>
    </div>
  ) : (
    <UserProvider>
      <BrowserRouter>
        <div
          className='flex moving-background'
          style={{
            marginBottom: '64px',
            height: 'calc(100vh - 64px)',
            ...colors,
            mixBlendMode: 'difference',
          }}
        >
          <div className='flex-grow overflow-x-scroll'>
            <Switch>
              <Route path='/train/:country'>
                <Train />
              </Route>
              <Route path='/leaderboard'>
                <Leaderboard />
              </Route>
              <Route path='/profile'>
                <Profile />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </div>
          <Navigation />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
};
