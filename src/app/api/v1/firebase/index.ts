import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as admin from "firebase-admin";
import serviceAccount from "./service-account.json";

const apps = getApps();
const firebase =
  apps.length === 0
    ? initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount
        ),
      })
    : apps[0];

export const db = getFirestore(firebase);
