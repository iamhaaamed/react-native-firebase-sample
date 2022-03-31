import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import BarChart from 'react-native-bar-chart';
import Spinner from 'react-native-loading-spinner-overlay';

import {Colors} from '~/styles';
import type {Transaction} from '~/types/Transaction';
import groupTimesBy from '~/utils/groupTimesBy';

export default function ChartScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<any>();

  useEffect(() => {
    setIsLoading(true);
    database()
      .ref('/transactions')
      .once('value')
      .then(snapshot => {
        const newTransactions: Transaction[] = [];
        snapshot.forEach(childSnapshot => {
          newTransactions.push({...childSnapshot.val(), id: childSnapshot.key});
        });
        console.log({newTransactions});
        setTransactions(groupTimesBy(newTransactions, 'createdAt'));

        return true;
      })
      .catch(error => {
        console.log(error);
        return true;
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <View>
      <Spinner visible={isLoading} />
      {transactions && Object.values(transactions)?.length > 0 && (
        <BarChart
          labelColor={Colors.black}
          data={Object.values(transactions)?.map((a: any) => a.length)}
          horizontalData={Object.keys(transactions)}
        />
      )}
    </View>
  );
}
