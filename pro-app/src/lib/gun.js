import Gun from 'gun';
import 'gun/sea';

const relays = [
  'https://gun-manhattan.herokuapp.com/gun',
  'https://relay.peer.ooo/gun'
];

export const gun = Gun({ peers: relays });
export const user = gun.user().recall({ sessionStorage: true });
