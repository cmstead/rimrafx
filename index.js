#!/usr/bin/env node

function getFilenames(args) {
    return args
        .join(' ')
        .split('"')
        .map(function (value) {
            return value.trim();
        })
        .filter(function (value) {
            return value !== '';
        });
}

(function (createDeleteNextFile) {

    var rimraf = require('rimraf');

    var args = process.argv.slice(2);
    var filenames = getFilenames(args);
    var deleteNextFile = createDeleteNextFile(rimraf);

    if (filenames.length > 0) {
        deleteNextFile(filenames);
    } else {
        console.log('No file specified. Cannot continue with delete operation.')
        console.log('rimrafx usage: rimrafx filename [filename, [filename, ...]]');
    }

})(function (rimraf) {

    'use strict';

    function first(values) {
        return values[0];
    }

    function rest(values) {
        return values.slice(1);
    }

    function deleteNextFile(filenames) {

        rimraf(first(filenames), function (err) {
            if (err) {
                console.log('An error occurred, delete stopping.', err);
            } else if (filenames.length > 1) {
                deleteNextFile(rest(filenames));
            } else {
                console.log('File(s) deleted.');
            }
        });

    }

    return deleteNextFile;
});
