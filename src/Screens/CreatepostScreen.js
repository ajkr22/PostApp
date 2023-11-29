import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatepostScreen = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [createdPost, setCreatedPost] = useState(null);

  useEffect(() => {
    loadPostFromStorage();
  }, []);

  const createPost = async () => {
    if (postTitle.trim() === '' || postBody.trim() === '') {
      alert('Please enter both post title and body.');
      return;
    }

    const newPost = {
      title: postTitle,
      body: postBody,
    };

    await savePostToStorage(newPost);

    setCreatedPost(newPost);

    setPostTitle('');
    setPostBody('');
  };

  const savePostToStorage = async post => {
    try {
      const existingPosts = await AsyncStorage.getItem('posts');
      const parsedPosts = existingPosts ? JSON.parse(existingPosts) : [];
      const updatedPosts = [...parsedPosts, post];
      await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
    } catch (error) {
      console.error('Error saving post to AsyncStorage:', error);
    }
  };

  const loadPostFromStorage = async () => {
    try {
      const existingPosts = await AsyncStorage.getItem('posts');
      if (existingPosts) {
        const parsedPosts = JSON.parse(existingPosts);

        setCreatedPost(parsedPosts[parsedPosts.length - 1]);
      }
    } catch (error) {
      console.error('Error loading post from AsyncStorage:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create a Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Post Title"
        value={postTitle}
        onChangeText={text => setPostTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Post Body"
        value={postBody}
        onChangeText={text => setPostBody(text)}
        multiline
      />

      <View style={styles.buttonContainer}>
        <Button title="Create Post" onPress={createPost} />
      </View>

      {createdPost && (
        <View style={styles.createdPostContainer}>
          <Text style={styles.createdPostTitle}>Created Post:</Text>
          <Text
            style={
              styles.createdPostText
            }>{`Title: ${createdPost.title}`}</Text>
          <Text
            style={styles.createdPostText}>{`Body: ${createdPost.body}`}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#87CEEB',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4169E1',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  createdPostContainer: {
    marginTop: 20,
  },
  createdPostTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4169E1',
  },
  createdPostText: {
    marginBottom: 8,
  },
});

export default CreatepostScreen;
