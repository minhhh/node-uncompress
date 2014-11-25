node ../../lib/node-uncompress.js ../../test/1.tar.tgz

if [ ! -f "1" ]; then
    echo "Test case failed"
    exit 1
fi

node ../../lib/node-uncompress.js ../../test/1.tar.tgz -d A

if [ ! -f "A/1" ]; then
    echo "Test case failed"
    exit 1
fi
