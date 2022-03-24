export default (db) => {
  let collection;
  const collections = {};

  function createCollection({ ledger }) {
    collection = db.addCollection(ledger.id, { disableMeta: true });
  }

  return {
    db,
    getCollection: (col) => collections[col] || collection,
    plugin: {
      onLoad: createCollection,
      onAdd(record) {
        if (!record.data) return;
        if (record.collection && !collections[record.collection]) {
          collections[record.collection] = db.addCollection(record.collection, {
            disableMeta: true,
          });
        }
        const col = !record.collection
          ? collection
          : collections[record.collection];

        const item = col.findOne({ "data.id": record.data.id });

        if (item) {
          col.update({ ...item, ...record });
        } else {
          col.insert(record);
        }
      },
    },
  };
};
