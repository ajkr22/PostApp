import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native';

const SearchScreen = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const data = await response.json();
      setAllPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = text => {
    setSearchQuery(text);

    const filtered = allPosts.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredPosts(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search posts..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postBody}>{item.body}</Text>
          </View>
        )}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#3498db',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#2980b9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  postBody: {
    color: '#34495e',
  },
  flatList: {
    marginTop: 16,
  },
});

export default SearchScreen;
