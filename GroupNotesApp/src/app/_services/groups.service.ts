import { Injectable } from '@angular/core'; 
import { Group } from '../_models/group.model';
import { GroupChat } from '../_models/groupChat.model';
import { AuthProvider } from '../_services/auth.service';
import { UtilitiesService } from '../_services/utilities.service';
import { FileStorageService } from '../_services/file-storage.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app'; 

@Injectable()
export class GroupsService {
  constructor( private afStore: AngularFirestore, private authService: AuthProvider, 
    private utilitiesService: UtilitiesService, private storageService: FileStorageService ) {
    
  }

  // Get all groups from database
  getAllGroups(): any {
    const groupRef: AngularFirestoreCollection<any> = this.afStore.collection(`groups`);

    return groupRef.valueChanges()
  }

   // Get a single group from the database
   getGroup(groupId: string): any {
    const groupRef: AngularFirestoreDocument<any> = this.afStore.doc(`groups/${groupId}`);

    return groupRef.valueChanges()
  }

  // Gets all the group chats from the database
  getAllGroupChats(): any {
    const groupChatRef: AngularFirestoreCollection<any> = this.afStore.collection(`groupChat`);

    return groupChatRef.valueChanges()
  }

  // Create a new group and set up document
  createGroup(group: Group) {
    this.setGroupDocument(group);
  }

  // Create a new group chat
  createChatPost(groupChat: GroupChat) {
    this.setGroupChatDocument(groupChat);
  }

  private setGroupDocument(group) {
    // To generate a random group ID I have adapted the code from the link below. 
    // Math.random() is not truly random but it takes a lot of iterations to see similarities.
    // It gets a string of 15 random letters and numbers.
    // https://stackoverflow.com/a/8084248
    let randomGroupId = Math.random().toString(36).substr(2, 15);
    
    // Set up group on Google cloud and MongoDB using the server.
    this.setUpFileStorage(randomGroupId);

    // Get the signed in user details which is used to populate the first group memeber (owner)
    // And build up object to be saved to database
    this.authService.getSignedInUserDetails().subscribe(data =>{
      const newGroup: Group = { 
        groupId: randomGroupId,
        groupName: group.groupName,
        groupDescription: group.groupDescription,
        profileImage: group.profilePicture,
        groupMembers: [{ 
            username: data.username,
            email: data.email,
            owner: true,
          }]
      };

      // Set the group id which will load on the home page
      // Set the group name which is used to display the current group on the homepage
      // And get reference to a new document on the Firestore with the new random group id
      localStorage.setItem ("groupId", randomGroupId);
      localStorage.setItem ("groupName", group.groupName);

      const groupRef: AngularFirestoreDocument<any> = this.afStore.doc(`groups/${newGroup.groupId}`);

      // Write object to the database
      groupRef.set(newGroup);

      // Set up object to be added to groupMembers array in the user document.
      let groupUser = { 
        groupId: randomGroupId,
        groupName: group.groupName,
        profileImage: group.profilePicture
      };

      // Add new group to user document so that current groups the user is a member of can be displayed on the home page.
      this.addGroupToUser(groupUser, data.email);
    });
  }

  private setGroupChatDocument(groupchat) {
    let chatID = Math.random().toString(36).substr(2, 15);

    this.authService.getSignedInUserDetails().subscribe(data =>{
      const newGroupChat: GroupChat = {
        chatID: groupchat.chatID,
        post: groupchat.post,
        username: groupchat.user
      };

      localStorage.setItem ("groupchatId", chatID);
      const groupRef: AngularFirestoreDocument<any> = this.afStore.doc(`groupChat/${newGroupChat.chatID}`);

      // Write object to the database
      groupRef.set(newGroupChat);
    });
  }

  // Set up group on Google cloud and MongoDB using the server.
  // This creates a bucket on Google cloud using the id along with a MongoDB document that is used to store and display the download urls.
  setUpFileStorage(groupId: string){
    this.storageService.createGroupUrl(groupId).subscribe(res =>
    {
      if (res.msg == "Successful"){
        this.utilitiesService.presentToast("Group added successfully!");
      }
      else{
        this.utilitiesService.presentToast("Error adding note please try again!");
      }
    });
  }

  // Add user to a group (join a group)
  addUserToGroup(group: any) {
    // Get the current signed in user details.
    this.authService.getSignedInUserDetails().subscribe(data =>{

      // Set reference to the group document on firestore.
      const groupRef: AngularFirestoreDocument<any> = this.afStore.doc(`groups/${group.groupId}`);
      let groupArray: any;

      // I was finding it hard to get the code to run in the sequence I wanted so that the search result would be ready
      // when it checked if the returned value was true/false.
      // From research online I found that a Promise would solve this as it will wait till a promise is returned
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

      // Start a Promise to check the group array to see if the currently signed in user is already in the group, 
      // if so resolve (return) "Fail", and if not found resolve "Success"
      var promise = new Promise(function(resolve, reject) {
        // Get group document from firebase
        groupRef.get().subscribe((doc) => {
          
          // Get the members array from the document
          groupArray = doc.get('groupMembers');

          // Search array to see if it constains the user
          for (let element of groupArray) {
            if (element.email == data.email){
              resolve('Fail');
              return;
            }
          }

          resolve('Success');
        });
      });
      
      // When the promise above returns run the rest of code to either display error message or add user to group.
      promise.then((value) => {

        if (value == "Success"){
          // Set up user object
          let user = {
            username: data.username,
            email: data.email,
            owner: false,
          };

          // As group array has already been returned in initial search there's no need to waste
          // resources to get it again, so add new user to array and merge with database.
          groupRef.update({
            groupMembers: firebase.firestore.FieldValue.arrayUnion(user)
          });

          let groupUser = { 
            groupId: group.groupId,
            groupName: group.groupName,
            profileImage: group.profileImage
          };

          // Add new group to user document so that current groups the user is a member of can be displayed on the home page.
          this.addGroupToUser(groupUser, data.email);

          this.utilitiesService.presentToast("Group successfully joined.");
        }
        else {
          // Display error message, if user is in group
          this.utilitiesService.presentToast("You're already a member of this group.");
        }
      }); // promise.then
    }); // Get signed in user
  }

  // Add group to user, which will be used to add group to user when joining so the users groups can be viewed.
  addGroupToUser(group, email: string) {
    // Get a reference to the collection and logged in users document
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${email}`);

    // I was initially doing this by getting the document from firebase, getting the array, pushing the new group
    // into the array and merging the results but from reasearh of the firebase documentation I found a way to simply do this.
    // https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
    userRef.update({
      groupsArray: firebase.firestore.FieldValue.arrayUnion(group)
    });
  }
}
