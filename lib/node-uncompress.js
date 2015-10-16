#!/usr/bin/env node
/*jshint multistr: true */
var doc = "\n\
Usage:\n\
    uncomp [-d DIR] [--type=TYPE] FILE\n\
           [--verbose]\n\
    uncomp -h | --help | --version\n\
\n\
Uncompress FILE using existing command line tools.\n\
\n\
Arguments:\n\
    FILE              File to be unzip.\n\
    \n\
Options:\n\
    -h --help         Show this screen.\n\
    --version         Show version.\n\
    -d DIR            Directory to be extracted to. It will be created if not exist.\n\
    -t --type=TYPE    Type of the file. Filetype is auto detect by default.\n\
    -v --verbose      Print verbose debug info.\n\
";

var shelljs = require('shelljs');
var docopt  = require('docopt');
var path    = require('path');
var sf = require("sf");

var TYPE = {
    TAR: 0,
    TAR_GZ: 1,
    ZIP: 2,
    BZ2: 3,
    TAR_BZ2: 4,
    RAR: 5,
    SEVEN_ZIP: 6,
};

var COMPRESS_PROFILE = {
    '0': {
        SCRIPT: "mkdir -p {1} && tar -C {1} {2} -xvf \"{0}\" ",
        SHELL: "tar",
        EXT: "tar",
    },
    '1': {
        SCRIPT: "mkdir -p {1} && tar -C {1} {2} -xzvf \"{0}\" ",
        SHELL: "tar",
        EXT: "tar.gz",
    },
    '2': {
        SCRIPT: "mkdir -p {1} && unzip -d {1} {2} -o \"{0}\"",
        SHELL: "unzip",
        EXT: "zip",
    },
    '3': {
        SCRIPT: "mkdir -p {1} && cp -fr {0} {1}/ || true && cd {1} && bunzip2 {2} -dk {3}",
        SHELL: "bzip2",
        EXT: "bz2",
    },
    '4': {
        SCRIPT: "mkdir -p {1} && tar -C {1} {2} -xjvf \"{0}\" ",
        SHELL: "tar",
        EXT: "tar.bz2",
    },
    '5': {
        SCRIPT: "mkdir -p {1} && cp -fr {0} {1}/ || SAME_DIR=1 && cd {1} && unrar {2} \"{3}\" -y && if [[ -z $SAME_DIR ]]; then rm -frv \"{3}\"; fi;",
        SHELL: "unrar",
        EXT: "rar",
    },
    '6': {
        SCRIPT: "mkdir -p {1} && cp -fr {0} {1}/ || SAME_DIR=1 && cd {1} && 7z x \"{3}\" -y && ([[ -z $SAME_DIR ]] && rm -frv \"{3}\")",
        SHELL: "7z",
        EXT: "7z",
    },
    '7': {
        SCRIPT: "mkdir -p {1} && tar -C {1} {2} -xzvf \"{0}\" ",
        SHELL: "tar",
        EXT: "tar.tgz",
    },
    '8': {
        SCRIPT: "mkdir -p {1} && tar -C {1} {2} -xzvf \"{0}\" ",
        SHELL: "tar",
        EXT: "tgz",
    },
    '9': {
        SCRIPT: "mkdir -p {1} && cp -fr {0} {1}/ || true && cd {1} && gunzip {2} -d {3}",
        SHELL: "gunzip",
        EXT: "gz",
    },
};


var kwargs = {
    name: "node-uncompress",
    version: "node-uncompress 0.0.1"
};

function getFileType(filename) {
    var possibles = [];
    for (var key in COMPRESS_PROFILE) {
        var ext = '.' + COMPRESS_PROFILE[key].EXT;
        var i = filename.indexOf(ext);
        if (i != -1 && i == (filename.length - ext.length) ) possibles.push(key);
    }
    if (possibles.length === 0) return -1;

    var max = 0;
    var result = -1;
    possibles.forEach(function(v, i, a) {
        var ext = '.' + COMPRESS_PROFILE[v].EXT;
        if (ext.length > max) {
            max = ext.length;
            result = v;
        }
    });

    return result;
}

function main(args) {
    var filename = args.FILE;
    var dir = args['-d'] || '.';
    var verbose = args['--verbose'] ? '-v' : '';
    var type = args['--type'];
    if (!type) {
        type = getFileType(filename);
    } else type = getFileType(type);

    if (type == -1) {
        error("Can't detect filetype!\n");
        process.exit(1);
    }

    var shScript = COMPRESS_PROFILE[type].SHELL;
    if (!shelljs.which(shScript)) {
        error(sf("Sorry, this script requires {0}. Please install it first!", shScript));
        process.exit(1);
    }

    var script = COMPRESS_PROFILE[type].SCRIPT;
    //special case
    if (type == TYPE.RAR) {
        if (!verbose) verbose = 'x';
        else verbose = 'v';
    }
    script = sf(script, filename, dir, verbose, path.basename(filename));
    var es = shelljs.exec(script);

    if (es.code !== 0) {
        process.exit(1);
    }
}

function error(err) {
    process.stderr.write(err);
}

if (require.main === module) {
    var args = docopt.docopt(doc, kwargs);
    main(args);
}

exports.TYPE = TYPE;
exports.getFileType = getFileType;

