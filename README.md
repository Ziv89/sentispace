# Feel Tracker App

A diary app to track your daily activities, and how you feel about them.
Feel Tracker will provide you with a day, week, and month view of the activities you want to track, as well as trending and statistics.

## Origin Story

Due to the worsening of my chronic medical conditions, I had to start tracking my daily activity. 

After thoroughly searching the Google Play Store, none of the available apps were good enough (or private enough) to suit my very specific needs.

I decided to make my own app to track my daily activities, with the ability to trace back weeks or even months and see useful trends.

Talking to some friends, I realized there's more demand for such app than I had imagined, so I decided to make it a public open-source project.

## Tech Stack

The app is built using Vite, React, TypeScript and Dexie.

### Styles:
This app uses SCSS and follows [Elad Shechter](https://eladsc.com/)'s [Storytelling Architecture](https://eladsc.com/2019/11/29/css-story-architecture-talk/) (at least for the folder hierarchy part) to keep the files neatly organized. 

### PWA and Local Storage:
To maximize privacy on this app, all of the user's data will be stored in local storage via [Dexie](https://dexie.org) (an IndexedDB wrapper). No server needed! Just "install" it locally and you're good to go.

### State Management:
This app uses React's [Context API](https://reactjs.org/docs/context.html) in combination with Dexie's [useLiveQuery](https://dexie.org/docs/dexie-react-hooks/useLiveQuery()) hook to achieve reactive, persistent states.

### Back-End:
There is none! The app is fully self-sustaining without any external connections other than the domain for PWA updates.

## Docs

- [ORS/FRS Definitions](https://docs.google.com/document/d/11IM741stFVj3_9otDXg5aKKYirAFxMybJnWy4EoPHIQ/view?usp=sharing)
- [Architecture Diagram](https://drive.google.com/file/d/1uRsWsnlG9A36mTwNWcML81U5gVK3qsg2/view?usp=sharing)

## Contributing

Currently the app is collaborators only, but in the future there'll be issues anyone can take to contribute to the project.

## Special Thanks To:

- [Haifa:Dev Developers Community](https://haifadev.netlify.app/) for supporting this project!
- [Nick Vilvovsky](https://github.com/nick-vi) for designing the UX and contributing to the app's development.
