import React, { useState, useEffect, useMemo, useContext, useRef } from 'react';
import { firestore } from 'firebase';

import { Levels, repsData } from '../types';
import { ISummaryData } from '../api';

import { UserContext, IUser } from '../UserProvider';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFirestoreDocument } from '../hooks/useFirestore';
import { useKey } from '../hooks/useKey';
import { useCovidSummary } from '../hooks/useCovidSummary';

import { Modal } from '../components/Modal';
import { CardItem } from '../components/CardItem';
import { CustomLink } from '../components/CustomLink';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const formatN = (n: number) => new Intl.NumberFormat('en-us').format(n);
export const Home: React.FC<{}> = () => {
  const { user } = useContext(UserContext);
  const [filterText, setFilterText] = useState<string>('');
  const [level, setLevel] = useLocalStorage<Levels>('userLevel', null);
  const { data } = useCovidSummary();
  const firebaseRef = useRef<firebase.firestore.DocumentReference>(
    firestore().collection('users').doc(user?.uid)
  );

  // const waifus = useWaifus();
  const [, setFirebaseUser] = useFirestoreDocument<IUser>(firebaseRef.current);

  const showLevelModal = useMemo(() => {
    if (level === null) {
      return true;
    }
    return false;
  }, [level]);

  // const size = useWindowsSize();
  const filteredCountryList = useMemo<ISummaryData['Countries']>(() => {
    return (
      data?.Countries.filter((contry: any) =>
        Object.values(contry).join(' ').includes(filterText)
      ) ?? []
    ).filter((e: any) => repsData[level ?? 'h']?.(e.NewConfirmed));
  }, [filterText, data, level]);

  useKey('h', () => {
    setLevel('h');
  });

  useEffect(() => {
    if (level !== null && user) {
      setFirebaseUser({ level }, true);
    }
  }, [level, user, firebaseRef, setFirebaseUser]);

  const loading = <LoadingSpinner />;
  const countries = React.useMemo(() => {
    return filteredCountryList.map((country, index) => {
      return (
        <CardItem key={country.CountryCode}>
          <CustomLink to={`/train/${country.CountryCode}`}>
            {country.Country} ({country.CountryCode}) :{' '}
            {formatN(country.NewConfirmed)} cases
          </CustomLink>
        </CardItem>
      );
    });
  }, [filteredCountryList]);

  return (
    <>
      <div
        className='flex w-full min-h-full justify-start items-center flex-col'
      >
        <h1 className='text-6xl mt-2'>Covid Trainer</h1>
        <p className='text-l text-bold'>Hello, {user?.name}</p>
        <div>
          Current Level : {level}
          <button
            className={`pl-2 text-red-500 font-bold`}
            onClick={() => setLevel(null)}
          >
            Change
          </button>
        </div>
        <input
          placeholder='Search Me'
          className={`border-solid p-2 border-2 rounded border-gray-600 ${
            !data ? 'bg-gray-400' : ''
          }`}
          type='text'
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        {data !== undefined ? (
          <>
            <p className='text-3xl text-bold'>
              Global cases : {formatN(data?.Global.TotalConfirmed)}
            </p>
            <div className='max-w-md p-4'>{countries}</div>
          </>
        ) : (
          loading
        )}
      </div>
      {showLevelModal && (
        <Modal title='Select Your Level'>
          <div className='w-full flex flex-col lg:flex-row py-2'>
            <div
              onClick={() => setLevel('beginner')}
              className='w-full flex flex-col justify-center items-center border-2 border-gray-300 h-24 transition duration-100 transition-all hover:bg-gray-400'
            >
              <h4 className='font-bold'>Beginner</h4>
              <h6>(1-20/rep)</h6>
            </div>
            <div
              onClick={() => setLevel('intermediate')}
              className='w-full flex flex-col justify-center items-center border-2 border-gray-300 h-24 transition-all duration-100 hover:bg-gray-400'
            >
              <h4 className='font-bold'>Intermediate</h4>
              <h6>(21-60/rep)</h6>
            </div>
            <div
              onClick={() => setLevel('pro')}
              className='w-full flex flex-col justify-center items-center border-2 border-gray-300 h-24 transition-all duration-100 hover:bg-gray-400'
            >
              <h4 className='font-bold'>Professional</h4>
              <h6>
                (<span className='text-red-500 font-bold'>61+</span>/rep)
              </h6>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
