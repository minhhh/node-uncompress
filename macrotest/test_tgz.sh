node ../../lib/node-uncompress.js ../../test/1.tgz

if [ ! -f "1" ]; then
    echo "Test case failed. No file"
    exit 1
fi

node ../../lib/node-uncompress.js ../../test/1.tgz -d A

if [ ! -f "A/1" ]; then
    echo "Test case failed. Can't create directory"
    exit 1
fi
