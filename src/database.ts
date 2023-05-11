import { ref, set, get, child, push } from 'firebase/database';
import { database as db } from './firebase';

const registerUsr: (uid: string, name: string) => void = (uid, name) => {
    set(ref(db, '/' + uid + '/name'), name);
};

const checkUsrExits: (uid: string) => Promise<boolean> = async uid => {
    try {
        const snapShot = await get(child(ref(db), '/' + uid));
        return snapShot.exists();
    } catch (e) {
        console.error(e);
        return false;
    }
};

const getUsrName: (uid: string) => Promise<string> = async uid => {
    try {
        const snapShot = await get(child(ref(db), '/' + uid + '/name'));
        if (snapShot.exists()) {
            return String(snapShot.val());
        }
    } catch (e) {
        console.error(e);
        return '';
    }
    return '';
};

const getUsrList: (
    uid: string
) => Promise<Array<{ uid: string; name: string }>> = async uid => {
    const childUID: Array<string> = [];
    const result: Array<{ uid: string; name: string }> = [];
    try {
        const snapShot = await get(child(ref(db), '/' + uid + '/contact'));
        snapShot.forEach(child => {
            if (child.key !== null) {
                childUID.push(child.key);
            }
        });
        for (let i = 0; i < childUID.length; ++i) {
            const item = childUID[i];
            const name = await getUsrName(item);
            result.push({ uid: item, name });
        }
        return result;
    } catch (e) {
        console.error(e);
        return [];
    }
};
const text: (message: string, fromUID: string, toUID: string) => void = (
    message,
    fromUID,
    toUID
) => {
    const textRef = push(
        ref(db, '/' + fromUID + '/contact/' + toUID + '/messages')
    );
    set(textRef, {
        id: fromUID,
        text: message,
    });
    const cloneRef = push(
        ref(db, '/' + toUID + '/contact/' + fromUID + '/messages')
    );
    set(cloneRef, {
        id: fromUID,
        text: message,
    });
};

const addUsr: (currentUID: string, toUID: string) => Promise<void> = async (
    currentUID,
    toUID
) => {
    set(ref(db, '/' + currentUID + '/contact/' + toUID), '');
    set(ref(db, '/' + toUID + '/contact/' + currentUID), '');
};

export { getUsrList, getUsrName, text, addUsr, registerUsr, checkUsrExits };
