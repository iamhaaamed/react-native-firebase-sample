/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MenuItem from '~/components/MenuItem';
import {Colors, Spacing} from '~/styles';

const App = () => {
  const [menus, setMenus] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    database()
      .ref('/menus')
      .once('value')
      .then(snapshot => {
        const newMenus: any = [];
        snapshot.forEach(childSnapshot => {
          newMenus.push({...childSnapshot.val(), id: childSnapshot.key});
        });
        setMenus(newMenus);

        return true;
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const sum = selectedItems?.map(o => o.price).reduce((a, c) => +a + +c, 0);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if (selectedItems?.map((a: any) => a.id).includes(item.id)) {
          setSelectedItems(prev => prev.filter((a: any) => a.id !== item.id));
        } else {
          setSelectedItems(prev => [...prev, item]);
        }
      }}
      style={{
        ...styles.menuItem,
        backgroundColor: selectedItems.map((a: any) => a.id).includes(item.id)
          ? Colors.lightgray
          : Colors.white,
      }}>
      <MenuItem label="Category" value={item.category} />
      <MenuItem label="Name" value={item.name} />
      <MenuItem label="Amount" value={item.amount} />
      <MenuItem label="Price" value={item.amount} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View style={{padding: Spacing.small}}>
        {selectedItems?.length > 0 && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              const newReference = database().ref('/transactions').push();

              newReference
                .set({
                  items: selectedItems.map(a => a.id),
                  createdAt: new Date().toUTCString(),
                })
                .then(() => setSelectedItems([]))
                .catch((error: any) => {
                  console.log(error);
                });
            }}>
            <Text
              style={{
                ...styles.buttonText,
                fontSize: Spacing.large,
              }}>
              Save Transaction
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.buttonText}>Sum: </Text>
              <Text style={styles.buttonText}>{sum}$</Text>
            </View>
          </TouchableOpacity>
        )}

        <FlatList
          data={menus}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flex: 1,
    padding: Spacing.small,
    borderRadius: 5,
    margin: Spacing.smallest,

    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.base,
    padding: Spacing.smaller,
    borderRadius: Spacing.smallest,
    backgroundColor: Colors.orange,

    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  buttonText: {fontWeight: 'bold', color: Colors.white},
});

export default App;
