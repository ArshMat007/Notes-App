import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  arrayRemove,
} from "firebase/firestore";
import { getRandomColor } from "../utils/colors";

export const DataContext = createContext(null); // React Context to share data across your whole app without prop drilling.

const DataProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [archiveNotes, setArchiveNotes] = useState([]);
  const [deleteNotes, setDeleteNotes] = useState([]);
  const [labels, setLabels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [user, setUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  

  useEffect(() => {


    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    let unsubscribeNotes =() => {};
    let unsubscribeLabels =() => {};

    if (user) {
      const notesCollectionPath = `users/${user.uid}/notes`; //It constructs a Firestore collection path using the user's unique ID (UID)
      unsubscribeNotes = onSnapshot(
        collection(db, notesCollectionPath), (snapshot) => {
          const fetchedNotes = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id}))
          .filter((note)=> !note.archive && !note.deleted);
          setNotes(fetchedNotes);

          const fetchedArchives = snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id}))
            .filter((note)=> note.archive && !note.deleted);
          setArchiveNotes(fetchedArchives);

          const fetchedDeleted = snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id}))
            .filter((note)=> note.deleted);
          setDeleteNotes(fetchedDeleted);
        }
      );

      const labelsCollectionPath = `users/${user.uid}/labels`;
      unsubscribeLabels = onSnapshot(
        collection(db, labelsCollectionPath), (snapshot) => {
          const fetchedLabels = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
          fetchedLabels.forEach(label => {
            if (!label.color) {
              const color = getRandomColor();
              const labelRef = doc(db, labelsCollectionPath, label.id);
              updateDoc(labelRef, { color });
            }
          });
          setLabels(fetchedLabels);
        }
      );
    } else {
      // If no user is logged in, clear the notes and labels
        setNotes([]);
        setArchiveNotes([]);
        setDeleteNotes([]);
        setLabels([]);
    }

    return () => {
      unsubscribeAuth();
      unsubscribeNotes();
      unsubscribeLabels();
    };
  }, [user]); //The return statement provides a cleanup function. 
    // When the component unmounts, it calls the unsubscribe functions to close the real-time listeners, 
    // preventing memory leaks.

  const getCollectionPath = (collectionName) => {
    if (!user) return null;
    return `users/${user.uid}/${collectionName}`;
  };

  const addNote = async (note) => {
    try {
      const path = getCollectionPath("notes");
      if (!path) return;
      await addDoc(collection(db, path), { ...note, deleted: false });
    } catch (error) {
      console.error("Error adding note in context:", error);
    }
  };

  const archiveNote = async (note) => {
    const path = getCollectionPath("notes");
    if (!path) return;
    const noteRef = doc(db, path, note.id);
    await updateDoc(noteRef, { archive: true });
  };

  const deleteNote = async (note) => {
    // Optimistic update
    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);

    const path = getCollectionPath("notes");
    if (!path) return;
    const noteRef = doc(db, path, note.id);
    await updateDoc(noteRef, { deleted: true });
    showNotification("Note moved to trash", "success");
  };

  const unArchiveNote = async (note) => {
    const path = getCollectionPath("notes");
    if (!path) return;
    const noteRef = doc(db, path, note.id);
    await updateDoc(noteRef, { archive: false });
  };

  const restoreNote = async (note) => {
    const path = getCollectionPath("notes");
    if (!path) return;
    const noteRef = doc(db, path, note.id);
    await updateDoc(noteRef, { deleted: false });
  };

  const removeNote = async (note) => {
    const path = getCollectionPath("notes");
    if (!path) return;
    const noteRef = doc(db, path, note.id);
    await deleteDoc(noteRef);
  };

  //reponsible for adding colors to the new labels created//
  const addLabel = async (labelName) => {
    try {
      const path = getCollectionPath("labels");
      if (!path) return;
      const color = getRandomColor();
      await addDoc(collection(db, path), { name: labelName, color });
    } catch (error) {
      console.error("Error adding label:", error);
    }
  }

  const updateNoteLabels = async (noteId, newLabels) => {
    const path = getCollectionPath("notes");
    if (!path) return;
    const noteRef = doc(db, path, noteId);
    await updateDoc(noteRef, { labels: newLabels });
  }

  const renameLabel = async (labelId, oldName, newName) => {
    const labelsPath = getCollectionPath("labels");
    if (!labelsPath) return;
    const labelRef = doc(db, labelsPath, labelId);
    await updateDoc(labelRef, { name: newName });

    const notesPath = getCollectionPath("notes");
    if (!notesPath) return;
    const q = query(collection(db, notesPath), where("labels", "array-contains", oldName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (noteDoc) => {
      const oldLabels = noteDoc.data().labels || [];
      const newLabels = oldLabels.map(l => l === oldName ? newName : l);
      await updateDoc(noteDoc.ref, { labels: newLabels });
    });
  }

  const deleteLabel = async (labelId, labelName) => {
    const labelsPath = getCollectionPath("labels");
    if (!labelsPath) return;
    await deleteDoc(doc(db, labelsPath, labelId));

    const notesPath = getCollectionPath("notes");
    if (!notesPath) return;
    const q = query(collection(db, notesPath), where("labels", "array-contains", labelName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (noteDoc) => {
      await updateDoc(noteDoc.ref, { labels: arrayRemove(labelName) });
    });
  }

  return (
    <DataContext.Provider
      value={{
        notes,
        setNotes,
        archiveNotes,
        setArchiveNotes,
        deleteNotes,
        setDeleteNotes,
        labels,
        setLabels,
        user,
        addNote,
        archiveNote,
        deleteNote,
        unArchiveNote,
        restoreNote,
        removeNote,
        addLabel,
        updateNoteLabels,
        deleteLabel,
        renameLabel,
        searchQuery,
        setSearchQuery,
        notification,
        setNotification,
        showNotification,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};//It renders the <DataContext.Provider>.
//The value prop is a large object containing every piece of state and every data manipulation function defined above.
//{children} refers to the rest of the application. By wrapping the app in this provider, every component within the app becomes a "child" and can access the value object.

export default DataProvider;