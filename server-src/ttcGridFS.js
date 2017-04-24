"use strict";

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const async = require('async');
const _ = require('lodash');
const assert = require('assert');


//let Schema = mongoose.Schema;
const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;

conn.on('error', console.error.bind(console, 'connection error:'));

const initGridFSConnection = () => {

	conn.once('open', () => {
	});
}

const saveFileToDb = (filepath, filename, category, collection_id) => {

	return new Promise((resolve, reject) => {

		let gfs = Grid(conn.db);

		let writestream = gfs.createWriteStream({ _id: new ObjectID(), filename: filename, metadata: { collection_id: collection_id, category: category } });
		fs.createReadStream(filepath).pipe(writestream);

		writestream.on('close', (file) => {
			resolve(null);
		});
	});
}

const retrieveFileFromDb = (file) => {

	assert(_.isObject(file), 'file not an object');

	return new Promise((resolve, reject) => {

		// Create a file with a name of the form 'file._id.<ext>', where <ext> is the extension of the original file
		let filepath = file._id + '.' + file.filename.substr(file.filename.lastIndexOf('.') + 1);

		// Check whether the file already exists
		fs.open(filepath, 'r', (err, fd) => {
			if (!err) {
				// File already exits
				fs.closeSync(fd);
				resolve(null);
			}
			else {
				// File does not exist...create it
				let fs_write_stream = fs.createWriteStream(filepath);

				let gfs = Grid(conn.db);

				//read from mongodb
				let readstream = gfs.createReadStream({ _id: file._id });
				readstream.pipe(fs_write_stream);
				fs_write_stream.on('close', () => {
					resolve(null);
				});
				fs_write_stream.on('error', () => {
					err = 'file creation error: ' + filepath;
					reject(err);
				});
			}
		});
	});
}

const removeFileFromDb = (file) => {

	assert(_.isObject(file), 'file not an object');

	return new Promise((resolve, reject) => {

		let gfs = Grid(conn.db);
		gfs.remove({ _id: file._id }, (err) => {
			err ? reject(err) : resolve(null);
		});
	});
}

const listNewsItemFiles = (newsitemid) =>

	new Promise((resolve, reject) => {

		let gfs = Grid(conn.db);
		gfs.files.find({}).toArray((err, files) => {
			if (err)
				reject(err);
			else {
				let newsItemFiles = [];
				for (let i = 0; i < files.length; ++i) {
					if (files[i].metadata.category == 'newsitem' && files[i].metadata.collection_id == newsitemid) {
						newsItemFiles.push(files[i]);
					}
				}
				resolve(newsItemFiles);
			}
		});
	});

const retrieveNewsItemFiles = (files) => Promise.all(files.map(retrieveFileFromDb));

const removeNewsItemFiles = (newsitemid) =>

	listNewsItemFiles(newsitemid)
		.then(files => Promise.all(files.map(removeFileFromDb)));

module.exports = {
	initGridFSConnection: initGridFSConnection,
	saveFileToDb: saveFileToDb,
	removeFileFromDb: removeFileFromDb,
	retrieveNewsItemFiles: retrieveNewsItemFiles,
	removeNewsItemFiles: removeNewsItemFiles,
	listNewsItemFiles: listNewsItemFiles
}

