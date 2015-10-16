# node-uncompress

[![Build Status](https://travis-ci.org/minhhh/node-uncompress.svg?branch=master)](https://travis-ci.org/minhhh/node-uncompress)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/minhhh/node-uncompress/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

Command-line wrapper for uncompressing various file types.

## Usage
Command line usage

    Usage:
        uncomp [-d DIR] [--type=TYPE] FILE
            [--verbose]
        uncomp -h | --help | --version

    Uncompress FILE using existing command line tools.

    Arguments:
        FILE              File to be unzip.

    Options:
        -h --help         Show this screen.
        --version         Show version.
        -d DIR            Directory to be extracted to. It will be created if not exist.
        -t --type=TYPE    Type of the file. Filetype is auto detect by default.
        -v --verbose      Print verbose debug info.

Examples

    # Uncompress rar file
    uncomp file.rar

    # Uncompress to a folder
    uncomp file.zip -d out

    # Uncompress a file with type
    uncomp file -t tar.gz

## Installation
Install via npm:

    npm install -g node-uncompress

## Depends
  * node v0.11.10 and above
  * docopt, shelljs
  * Command line tools available in user's path: tar, unrar, unzip, bunzip2

## Licence
MIT, see LICENSE.
