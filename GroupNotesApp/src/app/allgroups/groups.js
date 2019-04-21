// const groupList = document.querySelector('#groups-list');

// function getGroups(doc) {
//     let li = document.createElement('li');
//     let groupName = document.createElement('span');

//     li.setAttribute('data-id', doc.id);
//     groupName.textContent = doc.data().groupName;

//     li.appendChild(groupName);

//     groupList.appendChild(li);
// }

// // Asynchronous method - takes some time to do. It returns a promise
// // Unable to store this in a variable as it may not have populated yet
// db.collection('groups').get().then(() => {
//     snapshot.docs.forEach(doc => {
//         getGroups(doc);
//     });
// })