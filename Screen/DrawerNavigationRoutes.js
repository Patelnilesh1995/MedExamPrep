// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity, Image } from 'react-native';


// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, useRoute, } from '@react-navigation/native';


// Import Screens
import AddEditMemberScreen from './DrawerScreens/AddEditMemberScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import DashboardScreen from './DrawerScreens/Dashboard/DashboardScreen';
import MemberDetailScreen from './DrawerScreens/Dashboard/MemberDetailScreen';
import AboutScreen from './DrawerScreens/AboutScreen';
import CommitteeMemberScreen from './DrawerScreens/CommitteeMemberScreen';
import PastPresidentScreen from './DrawerScreens/PastPresidentScreen';
import PresidentMessageScreen from './DrawerScreens/PresidentMessageScreen';
import NotificationScreen from './DrawerScreens/NotificationScreen';
import { useNavigation } from '@react-navigation/native';


import SearchScreen from './DrawerScreens/Search/SearchScreen';

import BlogScreen from './DrawerScreens/Blog/BlogScreen';
import YourBlogDetails from './DrawerScreens/Blog/YourBlogDetails';

import CourseScreen from './DrawerScreens/Course/CourseScreen';
import YourCourseDetails from './DrawerScreens/Course/YourCourseDetails';
import CourseBuyNow from './DrawerScreens/Course/CourseBuyNow';

import ProfileScreen from './DrawerScreens/Profile/ProfileScreen';
import EditProfile from './DrawerScreens/Profile/EditProfile';
import Settings from './DrawerScreens/Profile/Settings';
import ChangePassword from './DrawerScreens/Profile/ChangePassword';
import MyPacakges from './DrawerScreens/Profile/MyPacakges';
import MyTransaction from './DrawerScreens/Profile/MyTransaction';
import TermAndConditions from './DrawerScreens/Profile/TermAndConditions';
import PrivacyPolicy from './DrawerScreens/Profile/PrivacyPolicy';
import MockTestScreen from './DrawerScreens/Profile/MockTestScreen';

import { Colors } from '../../themes/colors';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



const backColor = "#4EBCD5";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


function NotificationIcon() {
  const navigation = useNavigation();

  const handlePress = () => {
    // Handle notification icon press event here
    navigation.navigate('NotificationScreen');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialIcons style={{ marginRight: 10 }} color="white" name="notifications" size={30} />
    </TouchableOpacity>
  );
}


const DashboardScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="DashboardScreen">
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          title: 'Dashboard', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerRight: () => <NotificationIcon />,


          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#ffffff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },

        }}
      />

      <Stack.Screen
        name="MemberDetailScreen"
        component={MemberDetailScreen}

        options={({ route }) => ({
          title: route.params.title,
          // headerLeft: () => (
          //   <NavigationDrawerHeader navigationProps={navigation} />
          // ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },

          headerTintColor: '#ffffff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
            headerTitleAlign: 'center',
          },


          headerBackTitleVisible: false

        })}
      />

      <Stack.Screen
        name="AddEditMemberScreen"
        component={AddEditMemberScreen}
        options={{
          title: 'Add / Edit Member Detail', //Set Header Title
          // headerLeft: () => (
          //   <NavigationDrawerHeader navigationProps={navigation} />
          // ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#ffffff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },

        }}
      />
    </Stack.Navigator>
  );
};

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="AddEditMemberScreen">
      <Stack.Screen
        name="AddEditMemberScreen"
        component={AddEditMemberScreen}
        options={{
          title: 'User Profile', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#ffffff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },

        }}
      />
    </Stack.Navigator>
  );
};

const AboutScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="AboutScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          title: 'About Us', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const PresidentMessageStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="PresidentMessageScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="PresidentMessageScreen"
        component={PresidentMessageScreen}
        options={{
          title: 'President\'s Message', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const CommitteeMemberStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="CommitteeMemberScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="CommitteeMemberScreen"
        component={CommitteeMemberScreen}
        options={{
          title: 'Committee Members', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const PastPresidentStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="PastPresidentScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="PastPresidentScreen"
        component={PastPresidentScreen}
        options={{
          title: 'Past Presidents', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const NotificationStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="NotificationScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: 'Notifications', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};


const DashobardStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="DashboardScreen" headerMode="none">
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="CourseScreen" component={CourseScreen} />
      {/* <Stack.Screen name="YourCourseDetails" component={YourCourseDetails} tabBarVisible={false}></Stack.Screen> */}
    </Stack.Navigator>
  );
};

const SearchStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="SearchScreen" headerMode="none">
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

const BlogStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="BlogScreen" headerMode="none">
      <Stack.Screen name="BlogScreen" component={BlogScreen} />
      <Stack.Screen name="YourBlogDetails" component={YourBlogDetails} />

    </Stack.Navigator>
  );
};


const CourseStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="CourseScreen" headerMode="none">
      <Stack.Screen name="CourseScreen" component={CourseScreen} />
      <Stack.Screen name="YourCourseDetails" component={YourCourseDetails} tabBarVisible={false}
        options={{ tabBarVisible: false }} />
      <Stack.Screen name="CourseBuyNow" component={CourseBuyNow} tabBarVisible={false}
        options={{ tabBarVisible: false }} />
    </Stack.Navigator>
  );
};


const ProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen" headerMode="none">
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile}
        options={{ tabBarVisible: false }} />
      <Stack.Screen name="Settings" component={Settings} tabBarVisible={false}
        options={{ tabBarVisible: false }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} tabBarVisible={false}
        options={{ tabBarVisible: false }} />
      <Stack.Screen name="MyPacakges" component={MyPacakges} tabBarVisible={false}
        options={{ tabBarVisible: false }} />
      <Stack.Screen name="MyTransaction" component={MyTransaction} tabBarVisible={false}
        options={{ tabBarVisible: false }} />
      <Stack.Screen name="TermAndConditions" component={TermAndConditions} tabBarVisible={false}
        options={{ tabBarVisible: false }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} tabBarVisible={false}
        options={{ tabBarVisible: false }} />

      <Stack.Screen name="MockTestScreen" component={MockTestScreen} tabBarVisible={false}
        options={{ tabBarVisible: false }} />

    </Stack.Navigator>
  );
};



const DrawerNavigatorRoutes = (props) => (
  <Tab.Navigator
    initialRouteName="Home" activeColor="#fff"
    tabBarOptions={
      {
        activeTintColor: backColor,
      }
    }
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: true,
      //tabBarStyle: { backgroundColor: '#AD40AF' },
      tabBarStyle: { backgroundColor: backColor, borderColor: backColor, borderTopColor: backColor, borderTopWidth: 0 },
      tabBarInactiveTintColor: '#000',
      tabBarActiveTintColor: '#fff',
    }}>
    {/* initialRouteName="Home" activeColor="#fff" > */}

    <Tab.Screen
      name="Home"
      component={DashobardStack}
      options={({ route }) => ({
        tabBarLabel: 'Home',
        tabBarColor: backColor,
        tabBarVisible: getTabBarVisibility(route),
        //tabBarStyle: { display: 'none' },
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      })}

    />
    {/* <Tab.Screen
      name="Astrologist"
      component={AstrologistStackScreen}
      options={{
        tabBarLabel: 'Astrologist',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-list" color={color} size={26} />
        ),
      }}
    /> */}


    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={({ route }) => ({
        title: 'Search',
        tabBarLabel: 'Search',
        tabBarColor: '#d02860',
        tabBarVisible: getTabBarVisibility(route),
        tabBarIcon: ({ color }) => (
          <Icon name="ios-search" color={color} size={26} />
        ),
        // headerLeft: () => (
        //   <View style={{ marginLeft: 10 }}>
        //     <Icon.Button
        //       name="ios-menu"
        //       size={25}
        //       backgroundColor={colors.background}
        //       color={colors.text}
        //       onPress={() => navigation.openDrawer()}
        //     />
        //   </View>
        // ),
      })}


    />

    <Tab.Screen
      name="Couser"
      component={CourseStack}
      options={({ route }) => ({
        tabBarLabel: 'Course',
        tabBarColor: '#d02860',
        tabBarVisible: getTabBarVisibility(route),
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="play" color={color} size={26} />
        ),
      })}
    />


    <Tab.Screen
      name="Blog"
      component={BlogStack}
      options={({ route }) => ({
        tabBarLabel: 'Blog',
        tabBarColor: '#d02860',
        tabBarVisible: getTabBarVisibility(route),
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="blog" color={color} size={26} />
        ),
      })}
    />


    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={({ route }) => ({
        tabBarLabel: 'Profile',
        tabBarColor: '#694fad',
        tabBarVisible: getTabBarVisibility(route),
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      })}
    />
    {/* <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: '#d02860',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    /> */}


  </Tab.Navigator>
);


/*const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
 
  //console.log('=======================',routeName);
  if (routeName != 'Home' && routeName != 'Search' && routeName != 'Blog' && routeName != 'Profile' && routeName != 'Course') {
    return false;
  }

  return true;
};*/

const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  if (routeName === 'EditProfile') {
    return false; // Hide tab bar for EditProfile screen
  }

  // Your existing logic for other routes
  if (
    routeName !== 'Home' &&
    routeName !== 'Search' &&
    routeName !== 'Blog' &&
    routeName !== 'Profile' &&
    routeName !== 'Course'
  ) {
    return false;
  }

  return true;
};

export default DrawerNavigatorRoutes;
