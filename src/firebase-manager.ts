// TODO Create a manager to read, write from firebase/firestore
// to make things organized.
import * as React from "react";
import firebase from "firebase";
import { BoardObj, FeedbackObj } from "./types";

type QuerySnapshot<T> = firebase.firestore.QuerySnapshot<T>;
type DocumentData = firebase.firestore.DocumentData;

export class FirebaseManager {
  static BOARDS_COLLECTION_PATH = "boards";
  static FEEDBACKS_COLLECTION_PATH = "feedbacks";

  constructor(firebaseConfig) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  /** Public Methods */
  async getBoard(boardId: string): Promise<BoardObj> {
    const board = await this._getBoardRef(boardId).get();

    const boardData = board.exists
      ? board.data()
      : {
          name: "Board Not Found",
          description: "Blah blah blah...",
          password: "",
          unlockKey: "",
          feedbackCount: 0,
        };
    return boardData as BoardObj;
  }

  async getFeedbacks(boardId: string): Promise<any> {
    const feedbacksCollection = await this._getBoardRef(boardId)
      .collection(FirebaseManager.FEEDBACKS_COLLECTION_PATH)
      .get();

    return this._querySnapshotToArray(feedbacksCollection);
  }

  addFeedback(boardId: string, feedbackData: FeedbackObj) {
    // upload the feedback
    this._getBoardRef(boardId)
      .collection(FirebaseManager.FEEDBACKS_COLLECTION_PATH)
      .add(feedbackData);

    // increase the feedbackCount
    this._getBoardRef(boardId).update({
      feedbackCount: firebase.firestore.FieldValue.increment(1),
    });
  }

  /** Protected Utility Methods */
  _getBoardRef(boardId: string) {
    return firebase
      .firestore()
      .collection(FirebaseManager.BOARDS_COLLECTION_PATH)
      .doc(boardId);
  }

  _querySnapshotToArray(querySnapshot: QuerySnapshot<DocumentData>) {
    const arr = [];
    querySnapshot.forEach((snapshot) => {
      arr.push({ id: snapshot.id, ...snapshot.data() });
    });
    return arr;
  }
}

export const FirebaseContext = React.createContext<FirebaseManager>(null);

// const feedbacksRef = docRef.collection("feedbacks");
// const feedbacksArr = await feedbacksRef.get();
// const y = [];
// const x = feedbacksArr.forEach((snap) => y.push(snap.data()));
// console.log(y);
