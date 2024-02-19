const { GridFSBucket } = require("mongodb");
const { Readable } = require("stream");
const client = require("./config");

const vehicles = async(file, ownerId) => {
    await client.connect();
    const db = client.db("Vehicles")
    const bucket = new GridFSBucket(db, { bucketName: 'vehicles' })
    // const stream = Readable.from(file.buffer);
    // const stream = bucket?.openUploadStream(file.originalname);
    const buffer = Readable.from(file.buffer);
    const stream = bucket.openUploadStream(file.originalname, { metadata: { ownerId } });
    buffer.pipe(stream);
    return new Promise((resolve, reject) => {
        stream.on("finish", () => {
          resolve(stream.id.toString());
        });
        stream.on("error", (error) => {
            reject(error);
          });
        });
}

module.exports = vehicles;