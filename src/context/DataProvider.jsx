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

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [archiveNotes, setArchiveNotes] = useState([]);
  const [deleteNotes, setDeleteNotes] = useState([]);
  const [labels, setLabels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [user, setUser] = useState(null);

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const unsubscribeNotes = onSnapshot(
      collection(db, "notes"),
      (snapshot) => {
        const fetchedNotes = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((note) => !note.archive && !note.deleted);
        setNotes(fetchedNotes);

        const fetchedArchives = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((note) => note.archive && !note.deleted);
        setArchiveNotes(fetchedArchives);

        const fetchedDeleted = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((note) => note.deleted);
        setDeleteNotes(fetchedDeleted);
      }
    );

    const unsubscribeLabels = onSnapshot(
      collection(db, "labels"),
      (snapshot) => {
        const fetchedLabels = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setLabels(fetchedLabels);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeNotes();
      unsubscribeLabels();
    };
  }, []);

  const addNote = async (note) => {
    try {
      await addDoc(collection(db, "notes"), note);
    } catch (error) {
      console.error("Error adding note in context:", error);
    }
  };

  const archiveNote = async (note) => {
    const noteRef = doc(db, "notes", note.id);
    await updateDoc(noteRef, { archive: true });
  };

  const deleteNote = async (note) => {
    const noteRef = doc(db, "notes", note.id);
    await updateDoc(noteRef, { deleted: true });
  };

  const unArchiveNote = async (note) => {
    const noteRef = doc(db, "notes", note.id);
    await updateDoc(noteRef, { archive: false });
  };

  const restoreNote = async (note) => {
    const noteRef = doc(db, "notes", note.id);
    await updateDoc(noteRef, { deleted: false });
  };

  const removeNote = async (note) => {
    const noteRef = doc(db, "notes", note.id);
    await deleteDoc(noteRef);
  };

  const addLabel = async (labelName) => {
    try {
      await addDoc(collection(db, "labels"), { name: labelName });
    } catch (error) {
      console.error("Error adding label:", error);
    }
  }

  const updateNoteLabels = async (noteId, newLabels) => {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, { labels: newLabels });
  }

  const renameLabel = async (labelId, oldName, newName) => {
    const labelRef = doc(db, "labels", labelId);
    await updateDoc(labelRef, { name: newName });

    const q = query(collection(db, "notes"), where("labels", "array-contains", oldName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (noteDoc) => {
      const oldLabels = noteDoc.data().labels || [];
      const newLabels = oldLabels.map(l => l === oldName ? newName : l);
      await updateDoc(noteDoc.ref, { labels: newLabels });
    });
  }

  const deleteLabel = async (labelId, labelName) => {
    await deleteDoc(doc(db, "labels", labelId));

    const q = query(collection(db, "notes"), where("labels", "array-contains", labelName));
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
};

export default DataProvider;