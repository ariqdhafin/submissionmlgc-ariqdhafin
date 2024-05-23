const { Firestore } = require('@google-cloud/firestore');

async function getHistory() {
  const db = new Firestore();
  const predictCollection = db.collection('predictions');
  const snapshot = await predictCollection.get();

  if (snapshot.empty) {
    return [];
  }

  const histories = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    histories.push({
      id: doc.id,
      history: {
        result: data.result,
        createdAt: data.createdAt,
        suggestion: data.suggestion,
        id: doc.id
      }
    });
  });

  return histories;
}

module.exports = getHistory;
