node ../../lib/node-uncompress.js ../../test/1.rar

if [ ! -d "1" ]; then
    echo "Test case failed"
    exit 1
fi

node ../../lib/node-uncompress.js ../../test/1.rar -d A

if [ ! -d "A/1" ]; then
    echo "Test case failed"
    exit 1
fi

node ../../lib/node-uncompress.js ../../test/1.rar -d A

if [ ! -d "A/1" ]; then
    echo "Test case failed"
    exit 1
fi
