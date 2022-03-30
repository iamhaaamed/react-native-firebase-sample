import React from 'react';
import {Text, View} from 'react-native';

export default function MenuItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Text style={{fontWeight: 'bold'}}>{label}: </Text>
      <Text>{value}</Text>
    </View>
  );
}
