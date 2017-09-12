# si-comments
A slack project of mine using React Native.

The first exciting thing about this project is exploring <a href="https://facebook.github.io/react-native/">React Native</a>, and <a href="http://www.styled-components.com">Styled Components</a>.
The second exciting thing about this project is exploring more Realtime behaviours, to find potential for increasing engagement in SI longer-term.

## Scope:
1. The app presents a list of notifications relevant to the logged in user
2. These notifications will be filtered to only show 'X_COMMENTED_ON_SOME_ENTITY_IN_SI'
3. User can click that notification and see the Entity Preview, as well as the comments underneath
4. The user can CRUD comments as well as Like/Unlike the entity itself
5. Updates on the entity will be shown in realtime

## Starting Point:
I used the Expo SDK for local dev. Here you can set up a boilerplate project that includes Tabbed Navigation. Most of the boilerplate is removed but still some is in there for reference.

## Setup
1. Clone this repository
2. Download the Expo <a href="https://expo.io/tools">XDE SDK</a>. This is the software the runs the local development server / packager for React Native.
3. Open the source project in your favourite IDE, and be sure to have Prettier installed / running before committing. There is a `.prettierrc` file that contains the config. 

## Dev Setup
When running Expo XDE, you need to have the following settings:
1. Development Mode should be checked
2. Protocol should be `exp://`
3. Host should be Localhost when using the iOS / Android Simulators, and LAN when testing with physical devices.*

* Note: When testing on a remote device, you'll need to add your dev system's IP address to the praisemanager whitelist. This isn't great but it's all we can do at the monet (See below under 'Push Notifications').
	
### Basic Auth (Dev)
We have whitelisted `exp://localhost:19000")` to be allowed to request an Auth token from our server. *In order to achieve basic dev auth, you must 

### Working with Push Notifications
- *Please note: Push Notifications will not work using the iOS / Android simulators. They need to run on a physical device* Because of this (and because `localhost` means nothing to an external device), the development build will be accessed via the IP address of your computer. Thus, the device will need to be on the same LAN as the computer. 

- The Praisemanager server needs to whitelist your IP `.add("exp://192.168.x.x:19000")`
