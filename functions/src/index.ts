import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const subscribeToTopic = functions.https.onCall(
    async (data, context) => {
        await admin.messaging().subscribeToTopic(data.token, data.topic);

        return `subscribed to ${data.topic}`;
    }
);

export const unsubscribeFromTopic = functions.https.onCall(
    async (data, context) => {
        await admin.messaging().unsubscribeFromTopic(data.token, data.topic);

        return `unsubscribed from ${data.topic}`;
    }
);

export const sendOnFirestoreCreate = functions.firestore
    .document('booking/{bookingId}')
    .onCreate(async snapshot => {

        const notification: admin.messaging.Notification = {
            title: 'Lịch hẹn!',
            body: ""
        };

        const payload: admin.messaging.Message = {
            notification,
            webpush: {
                notification: {
                    vibrate: [200, 100, 200],
                    icon: 'https://angularfirebase.com/images/logo.png',
                    actions: [
                        {
                            action: 'like',
                            title: '👍 Yaaay!'
                        },
                        {
                            action: 'dislike',
                            title: 'Boooo!'
                        }
                    ]
                }
            },
            topic: 'discounts'
        };

        return admin.messaging().send(payload);
    });

export const sendMassage = functions.https.onCall(
    async (data, context) => {
        const notification: admin.messaging.Notification = {
            title: 'Lịch hẹn!',
            body: ""
        };

        const payload: admin.messaging.Message = {
            notification,
            webpush: {
                notification: {
                    vibrate: [200, 100, 200],
                    icon: 'https://angularfirebase.com/images/logo.png',
                    actions: [
                        {
                            action: 'like',
                            title: '👍 Yaaay!'
                        },
                        {
                            action: 'dislike',
                            title: 'Boooo!'
                        }
                    ]
                }
            },
            topic: 'discounts'
        };

        return admin.messaging().send(payload);
    }
);

      
