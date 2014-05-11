node ../../lib/node-uncompress.js not.exist.tar

if [ $? != 1 ]; then
    echo "Test case failed"
    exit 1
fi

node ../../lib/node-uncompress.js ../../test/1.bz2 --type=.tar.gz || true

if [ -d "1" ]; then
    echo "Test case failed"
    exit 1
fi
