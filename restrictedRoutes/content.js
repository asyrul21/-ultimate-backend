// delete
router.delete('/:key', function (req, res, next) {
    // create query
    var query = {
        key: req.params.key
    }

    console.log('Query:', query);

    Content.deleteOne(query, function (err, content) {
        if (err || !query.key) {
            res.send(err);
        } else {
            // return saved Content
            res.json({
                'Status': 'Success'
            });
        }
    })
})

router.post('/', function (req, res, next) {
    var content = req.body

    // new content instance
    var newContent = new Content(content)

    // save content
    newContent.save(function (err, content) {
        if (err) {
            res.send(err);
        } else {
            // return saved Content
            res.json({
                'Status': 'Success',
                'contentSaved': content
            });
        }
    })
});