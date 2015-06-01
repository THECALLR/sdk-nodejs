
var realtime = {
    servr: function() {

        var CONTENT_TYPE = 'application/json';
        var outputHandler = null;

        this.setOutputHandler = function( callback ) {
            outputHandler = callback;
        };

        this.start = function( request, response ) {
            if (request.method == 'POST') {
                var body = '';

                request.on('data', function( chunk ) {
                    body += chunk.toString();
                });

                request.on('end', function() {

                    try {
                        var data = JSON.parse(body);

                    } catch ( e ) {

                    }

                    response.writeHead(200, 'OK', {'Content-Type': 'text/html'});
                    response.end();
                });
            }
        };
    },
};
