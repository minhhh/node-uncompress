node ../../lib/node-uncompress.js ../../test/1.bz2 -v

if [ ! -f "1" ]; then
    echo "Test case failed"
    exit 1
fi

rm -frv 1
cp ../../test/1.bz2 .
node ../../lib/node-uncompress.js 1.bz2 -v

if [ ! -f "1" ]; then
    echo "Test case failed"
    exit 1
fi

node ../../lib/node-uncompress.js ../../test/1.bz2 -v -d A

if [ ! -f "A/1" ]; then
    echo "Test case failed"
    exit 1
fi

node ../../lib/node-uncompress.js ../../test/1.bz2 -v -d A

if [ ! -f "A/1" ]; then
    echo "Test case failed"
    exit 1
fi

