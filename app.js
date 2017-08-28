var firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC1auxBzA7jTpnxZxEZCZkxf1bfyuEW3qA",
  authDomain: "visavi-a9ccc.firebaseapp.com",
  databaseURL: "https://visavi-a9ccc.firebaseio.com",
  projectId: "visavi-a9ccc",
  storageBucket: "visavi-a9ccc.appspot.com",
  messagingSenderId: "916405084664"
};
firebase.initializeApp(config);

var database = firebase.database();

/*createUser("JP0uDznawsRPFDZnVzhm2PSTetV2",
  "Isabelle",
  "Gates",
  "gs://visavi-a9ccc.appspot.com/person/anna.jpg",
  "gs://visavi-a9ccc.appspot.com/person/anna.jpg",
  "w",
  384739200,
  384739200,
  false);
*/
/*createStory(
  "JP0uDznawsRPFDZnVzhm2PSTetV2",
  "https://firebasestorage.googleapis.com/v0/b/visavi-a9ccc.appspot.com/o/profile_low.jpg?alt=media&token=4d55df8f-576b-4fab-bf65-13b3af463765",
  "Rene Hubert",
  "Phoenix Shisha Bar",
  "https://firebasestorage.googleapis.com/v0/b/visavi-a9ccc.appspot.com/o/shisha_high.jpg?alt=media&token=f6526381-5452-47c7-ace7-33c606fca9ae",
  "Lecker Burger",
  384739200,
  0);**/

addStoryToUserBoard("JP0uDznawsRPFDZnVzhm2PSTetV2", "-KmQxxxmi5hL9cpK8P1T")
//addStoryToUserBoard("Qa5hSTUyiZdQudEUcax90pmQ4OM2", "-KlZ6tJUgwu9IW9SxjK7")
/*
addStory("HDZ9VQG5WbTkHckrq3Z4073v4Dl2", "-KlXQsXi_fNAou_KQgBi")
addStory("Qa5hSTUyiZdQudEUcax90pmQ4OM2", "-Kjg06rEogPT4BtSCpTy")
addStory("Qa5hSTUyiZdQudEUcax90pmQ4OM2", "-Kjg0hZ48YLnP2vBmZ8-")
addStory("Qa5hSTUyiZdQudEUcax90pmQ4OM2", "-KlXQsXi_fNAou_KQgBi")
addStory("HDZ9VQG5WbTkHckrq3Z4073v4Dl2", "-Kjg06rEogPT4BtSCpTy")
addStory("HDZ9VQG5WbTkHckrq3Z4073v4Dl2", "-Kjg0hZ48YLnP2vBmZ8-")
*/

/*likeStory(
    "Qa5hSTUyiZdQudEUcax90pmQ4OM2",
    "HDZ9VQG5WbTkHckrq3Z4073v4Dl2",
    "-Kjg06rEogPT4BtSCpTy");*/

//getUserStories("Qa5hSTUyiZdQudEUcax90pmQ4OM2");

function addStory(userId, storyId) {

  var test = {};

  test[storyId] = true;

  firebase.database()
    .ref('userStoryList/' + userId)
    .update(test);
}

function addStoryToUserBoard(userId, storyId) {

  var test = {};

  test[storyId] = true;

  firebase.database()
    .ref('userStoryBoard/' + userId)
    .update(test);
}

function createUser(userId,
  firstName,
  lastName,
  bigPicture,
  smallPicture,
  gender,
  birthdate,
  lastActive,
  online) {

  firebase.database()
    .ref('users/' + userId)
    .set({
      firstName: firstName,
      lastName: lastName,
      bigPicture: bigPicture,
      smallPicture: smallPicture,
      gender: gender,
      birthdate: birthdate,
      lastActive: lastActive,
      online: online
    });
}

function createStory(userId, userPhotoUrl, displayName, location, photoUrl, message, createdAt) {
  firebase.database()
    .ref('story')
    .push({
      userId: userId,
      userSmallPhotoUrl: userPhotoUrl,
      displayName: displayName,
      location: location,
      photoUrl: photoUrl,
      message: message,
      createdAt: createdAt,
      likesCount: 0,
      commentsCount: 0
    });
}

function likeStory(creatorUserId, likeUserId, storyId) {

  var test = {};

  test[storyId] = true;

  firebase.database()
    .ref('storyLikes/' + likeUserId)
    .update(test);

  firebase.database()
    .ref('stories/' + creatorUserId + '/' + storyId)
    .transaction(function (story) {
      if (story) {
        story.likesCount++;
      }
      return story;
    });
}

function getUserStories(userId) {
  firebase.database()
    .ref('stories/' + userId)
    .on('child_added', function (data) {
      console.log(data.val());
    });
}
