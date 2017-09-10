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
2. Download the Expe <a href="https://expo.io/tools">XDE SDK</a>. This is the software the runs the local development server / packager.
3. Open the project in your favourite IDE, and be sure to have Prettier installed / running before committing. There is a `.prettierrc` file that contains the config. 
