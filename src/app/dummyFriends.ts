export const dummyFriends = [
  { uid: "u1", name: "Alice Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { uid: "u2", name: "Bob Smith", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { uid: "u3", name: "Charlie Davis", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  { uid: "u4", name: "Diana Wilson", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
  { uid: "u5", name: "Ethan Brown", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
  { uid: "u6", name: "Fiona Clark", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
  { uid: "u7", name: "George White", avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
  { uid: "u8", name: "Hannah Moore", avatar: "https://randomuser.me/api/portraits/women/8.jpg" }
];


export type Friend = {
    uid: string
    name: string
    avatar: string
}