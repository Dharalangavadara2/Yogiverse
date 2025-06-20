import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const ITEM_SIZE = width / NUM_COLUMNS;

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'saved'>('posts');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    username: 'jk',
    fullName: 'Jay Chhaniyara',
    bio: 'Its Boy Jk',
    profileImage: 'https://picsum.photos/200',
    postsCount: 7,
    followersCount: 2,
    followingCount: 3
  });

  // Mock data - replace with your API data
  const [posts, setPosts] = useState([
    { id: '1', type: 'image', uri: 'https://picsum.photos/400', likes: 24, comments: 3 },
    { id: '2', type: 'image', uri: 'https://picsum.photos/401', likes: 56, comments: 7 },
    { id: '3', type: 'reel', uri: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', likes: 102, comments: 12 },
    { id: '4', type: 'image', uri: 'https://picsum.photos/402', likes: 34, comments: 5 },
    { id: '5', type: 'image', uri: 'https://picsum.photos/403', likes: 78, comments: 9 },
    { id: '6', type: 'reel', uri: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4', likes: 201, comments: 24 },
  ]);

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{profile.postsCount}</Text>
        <Text style={styles.statLabel}>Posts</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{profile.followersCount}</Text>
        <Text style={styles.statLabel}>Followers</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{profile.followingCount}</Text>
        <Text style={styles.statLabel}>Following</Text>
      </View>
    </View>
  );

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
      {renderStats()}
    </View>
  );

  const renderBio = () => (
    <View style={styles.bioContainer}>
      <Text style={styles.username}>@{profile.username}</Text>
      <Text style={styles.fullName}>{profile.fullName}</Text>
      <Text style={styles.bioText}>{profile.bio}</Text>
    </View>
  );

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'posts' && styles.activeTab]}
        onPress={() => setActiveTab('posts')}
      >
        <Icon name="grid-outline" size={24} color={activeTab === 'posts' ? '#000' : '#888'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'reels' && styles.activeTab]}
        onPress={() => setActiveTab('reels')}
      >
        <Icon name="play-outline" size={24} color={activeTab === 'reels' ? '#000' : '#888'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'saved' && styles.activeTab]}
        onPress={() => setActiveTab('saved')}
      >
        <Icon name="bookmark-outline" size={24} color={activeTab === 'saved' ? '#000' : '#888'} />
      </TouchableOpacity>
    </View>
  );

  const renderPostItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.postItem}>
      <Image source={{ uri: item.uri }} style={styles.postImage} />
      {item.type === 'reel' && (
        <View style={styles.reelIndicator}>
          <Icon name="play" size={16} color="#fff" />
        </View>
      )}
      <View style={styles.postOverlay}>
        <View style={styles.postStat}>
          <Icon name="heart" size={14} color="#fff" />
          <Text style={styles.postStatText}>{item.likes}</Text>
        </View>
        <View style={styles.postStat}>
          <Icon name="chatbubble" size={14} color="#fff" />
          <Text style={styles.postStatText}>{item.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'posts') return post.type === 'image';
    if (activeTab === 'reels') return post.type === 'reel';
    return true; // For saved tab
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderProfileHeader()}
        {renderBio()}
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {renderTabBar()}

        <FlatList
          data={filteredPosts}
          renderItem={renderPostItem}
          keyExtractor={item => item.id}
          numColumns={NUM_COLUMNS}
          scrollEnabled={false}
          contentContainerStyle={styles.postsGrid}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  bioContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 16,
    marginTop: 2,
  },
  bioText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  editButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    width: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  postsGrid: {
    padding: 1,
  },
  postItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: 0.5,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  reelIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 4,
  },
  postOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStatText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default ProfileScreen;