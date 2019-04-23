// Model for groups - defines the groupId, groupName, groupDescription, profileImage, and an array of groupMembers
export interface Group {
    groupId: string,
    groupName: string,
    groupDescription: string,
    profileImage: string,
    groupMembers: any[],
}