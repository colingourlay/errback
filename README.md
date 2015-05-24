# errback

Error-first callbacks everywhere!

## What?

So, because you're a decent, considerate human being, you write all of your callbacks in this format:

    function callback(error, result) {
        if (error) { throw error; }

        console.log(result);
    }

Good for you. You play well with others. High five from me.

Some APIs aren't as considerate...

They'll just go ahead and pass their result as the first argument to your callback:

    function badAPI(callback) {
        var result = 10;

        return callback(result);
    }

...giving you no way to consistently tell if an error occurred.

    badAPI(callback);

    // BOOM! Your callback just threw
    // something that wasn't an error!

What assholes, eh?

`errback` takes your error-first callback and returns a function that you can use with these terrible APIs. When it gets called, your original callback will be called with `null` as the first argument, and the original result as the second argument:

    badAPI(errback(callback));

    // > 10

Ahhhh, much better.
