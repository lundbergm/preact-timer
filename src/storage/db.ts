let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export interface User {
    id: string;
    name: string;
    email: string;
}

export enum Stores {
    Timers = 'timers',
}

export const initDB = (): Promise<boolean> => {
    return new Promise((resolve) => {
        // open the connection
        request = indexedDB.open('myDb', version);

        request.onupgradeneeded = () => {
            db = request.result;

            // if the data object store doesn't exist, create it
            if (!db.objectStoreNames.contains(Stores.Timers)) {
                console.log('Creating timer store');
                db.createObjectStore(Stores.Timers, { keyPath: 'id' });
            }
            // no need to resolve here
        };

        request.onsuccess = () => {
            db = request.result;
            version = db.version;
            console.log('request.onsuccess - initDB', version);
            resolve(true);
        };

        request.onerror = () => {
            resolve(false);
        };
    });
};

export const addData = <T>(storeName: string, data: T): Promise<T | string | null> => {
    return new Promise((resolve) => {
        request = indexedDB.open('myDb', version);

        request.onsuccess = () => {
            console.log('request.onsuccess - addData', data);
            db = request.result;
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            store.add(data);
            resolve(data);
        };

        request.onerror = () => {
            const error = request.error?.message;
            if (error) {
                resolve(error);
            } else {
                resolve('Unknown error');
            }
        };
    });
};

export const getAll = <T>(storeName: string): Promise<T[]> => {
    return new Promise((resolve) => {
        request = indexedDB.open('myDb');

        request.onsuccess = () => {
            console.log('request.onsuccess - getAllData');
            db = request.result;
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const res = store.getAll();
            res.onsuccess = () => {
                resolve(res.result);
            };
        };
    });
};
