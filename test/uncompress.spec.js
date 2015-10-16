var uncompress = require('../lib/node-uncompress');

describe("node-uncompress", function () {
    it("should get correct file type", function (done) {
        expect(uncompress.getFileType('file.tar.gz')).toEqual('1');
        expect(uncompress.getFileType('filetar.gz')).toEqual('9');
        expect(uncompress.getFileType('filetar')).toEqual(-1);
        done();
    });
});
