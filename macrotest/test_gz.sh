node ../../lib/node-uncompress.js ../../test/1.gz -v

if [ ! -f "1" ]; then
    echo "Test case failed case 1"
    exit 1
fi

rm -frv 1
cp ../../test/1.gz .
node ../../lib/node-uncompress.js 1.gz -v

if [ ! -f "1" ]; then
    echo "Test case failed case 2"
    exit 1
fi

node ../../lib/node-uncompress.js ../../test/1.gz -v -d A

if [ ! -f "A/1" ]; then
    echo "Test case failed case 3"
    exit 1
fi

