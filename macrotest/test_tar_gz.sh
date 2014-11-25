node ../../lib/node-uncompress.js ../../test/1.tar.gz

if [ ! -d "1" ]; then
    echo "Test case failed"
    exit 1
fi

node ../../lib/node-uncompress.js ../../test/1.tar.gz -d A

if [ ! -d "A/1" ]; then
    echo "Test case failed"
    exit 1
fi
