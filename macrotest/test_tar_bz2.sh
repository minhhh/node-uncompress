node ../../lib/node-uncompress.js ../../test/1.tar.bz2

if [ ! -d "1" ]; then
    echo "Test case failed"
    exit 1
fi

node ../../lib/node-uncompress.js ../../test/1.tar.bz2 -d A

if [ ! -d "A/1" ]; then
    echo "Test case failed"
    exit 1
fi
